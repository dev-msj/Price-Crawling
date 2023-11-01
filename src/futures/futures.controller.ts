import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FuturesService } from './futures.service';
import { CreateFutureDto } from './dto/create-futures.dto';
import { DateStringPipe } from 'pipe/date-string.pipe';

@Controller('futures')
export class FuturesController {
  constructor(private readonly futuresService: FuturesService) {}

  @Post()
  create(@Body() createFutureDto: CreateFutureDto) {
    return this.futuresService.create(createFutureDto);
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
