import { Controller, Get, Post, Param } from '@nestjs/common';
import { FuturesService } from './futures.service';
import { DateStringPipe } from 'pipe/date-string.pipe';
import { SuccessResponseDto } from './response/success-response.dto';

@Controller('futures')
export class FuturesController {
  constructor(private readonly futuresService: FuturesService) {}

  @Post()
  async startFuturesDBUpdate() {
    await this.futuresService.startFuturesDBUpdate();

    return new SuccessResponseDto();
  }

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
