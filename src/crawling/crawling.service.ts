import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AxiosError } from 'axios';
import { Builder } from 'builder-pattern';
import { catchError, firstValueFrom, map } from 'rxjs';
import crawlingConfig from 'src/config/crawlingConfig';
import futuresEnum from 'src/constant/FuturesEnum';
import { CreateFuturesDto } from 'src/futures/dto/create-futures.dto';

@Injectable()
export class CrawlingService {
  private apiUrl: string;
  private queryString: string;

  constructor(
    private httpService: HttpService,
    @Inject(crawlingConfig.KEY)
    private config: ConfigType<typeof crawlingConfig>,
  ) {
    this.apiUrl = config.apiUrl;
    this.queryString = this.makeQueryString();
  }

  async requestDataToAPI(): Promise<CreateFuturesDto[]> {
    const futuresPriceList = [];
    for (const item in futuresEnum) {
      const requestUrl = `${this.apiUrl}/${futuresEnum[item]}?${this.queryString}`;
      const response = this.httpService.get<JSON>(requestUrl);

      const data = await firstValueFrom(
        response
          .pipe(
            map(
              async (res) =>
                await this.parseDataFormat(
                  res.data['chart']['result'][0],
                  futuresEnum[item],
                ),
            ),
          )
          .pipe(
            catchError((error: AxiosError) => {
              throw new ForbiddenException(error);
            }),
          ),
      );

      futuresPriceList.push(...data);
    }

    return futuresPriceList;
  }

  private makeQueryString(): string {
    const queryOption = {
      region: 'US',
      lang: 'en-US',
      includePrePost: false,
      interval: '1d',
      range: '1mo',
      corsDomain: 'search.yahoo.com',
    };

    const queryStringBuild = [];
    for (const key in queryOption) {
      queryStringBuild.push(`${key}=${queryOption[key]}`);
    }

    return queryStringBuild.join('&');
  }

  private async parseDataFormat(
    data: JSON,
    futuresName: string,
  ): Promise<CreateFuturesDto[]> {
    if (data['timestamp'] === undefined) {
      return [];
    }

    const timestamp: number[] = data['timestamp'];
    const quote: JSON = data['indicators']['quote'][0];
    const createFuturesDtoList: CreateFuturesDto[] = [];

    for (let i = 0; i < timestamp.length; i++) {
      createFuturesDtoList.push(
        Builder(CreateFuturesDto)
          .futuresId(timestamp[i])
          .futuresDate(new Date(timestamp[i] * 1000))
          .futuresName(futuresName)
          .openPrice(quote['open'][i])
          .closePrice(quote['close'][i])
          .highPrice(quote['high'][i])
          .lowPrice(quote['low'][i])
          .volume(quote['volume'][i])
          .build(),
      );
    }

    return createFuturesDtoList;
  }
}
