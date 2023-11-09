import { Controller, Get, Param, Inject } from '@nestjs/common';
import { FuturesService } from './futures.service';
import { DateStringPipe } from 'pipe/date-string.pipe';
import { ConfigType } from '@nestjs/config';
import crawlingConfig from 'src/config/crawlingConfig';

@Controller('futures')
export class FuturesController {
  constructor(
    @Inject(crawlingConfig.KEY)
    private config: ConfigType<typeof crawlingConfig>,
    private readonly futuresService: FuturesService,
  ) {}

  @Get(':futures_name')
  async findFutures(@Param('futures_name') futures_name: string) {
    return await this.futuresService.findFutures(futures_name);
  }

  @Get(':futures_name/:start_date/:end_date')
  async findFuturesByPeriod(
    @Param('futures_name') futures_name: string,
    @Param('start_date', DateStringPipe) start_date: string,
    @Param('end_date', DateStringPipe) end_date: string,
  ) {
    return await this.futuresService.findFuturesByPeriod(
      futures_name,
      start_date,
      end_date,
    );
  }
}
