import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FuturesService } from './futures.service';
import { CreateFutureDto } from './dto/create-futures.dto';

@Controller('futures')
export class FuturesController {
  constructor(private readonly futuresService: FuturesService) {}

  @Post()
  create(@Body() createFutureDto: CreateFutureDto) {
    return this.futuresService.create(createFutureDto);
  }

  @Get(':futures_name')
  async findOne(@Param('futures_name') futures_name: string) {
    return await this.futuresService.findFutures(futures_name);
  }
}
