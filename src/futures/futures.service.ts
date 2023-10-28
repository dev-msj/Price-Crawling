import { Injectable } from '@nestjs/common';
import { CreateFutureDto } from './dto/create-future.dto';
import { UpdateFutureDto } from './dto/update-future.dto';

@Injectable()
export class FuturesService {
  create(createFutureDto: CreateFutureDto) {
    return 'This action adds a new future';
  }

  findAll() {
    return `This action returns all futures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} future`;
  }

  update(id: number, updateFutureDto: UpdateFutureDto) {
    return `This action updates a #${id} future`;
  }

  remove(id: number) {
    return `This action removes a #${id} future`;
  }
}
