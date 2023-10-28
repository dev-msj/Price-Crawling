import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FuturesService } from './futures.service';
import { CreateFutureDto } from './dto/create-future.dto';
import { UpdateFutureDto } from './dto/update-future.dto';

@Controller('futures')
export class FuturesController {
  constructor(private readonly futuresService: FuturesService) {}

  @Post()
  create(@Body() createFutureDto: CreateFutureDto) {
    return this.futuresService.create(createFutureDto);
  }

  @Get()
  findAll() {
    return this.futuresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.futuresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFutureDto: UpdateFutureDto) {
    return this.futuresService.update(+id, updateFutureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.futuresService.remove(+id);
  }
}
