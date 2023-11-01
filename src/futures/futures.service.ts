import { Injectable } from '@nestjs/common';
import { CreateFutureDto } from './dto/create-futures.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Futures } from './entities/futures.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FuturesService {
  constructor(
    @InjectRepository(Futures)
    private futuresRepository: Repository<Futures>
  ) {}
  create(createFutureDto: CreateFutureDto) {
    return 'This action adds a new future';
  }

  async findFutures(futures_name: string) {
    const futures = await this.futuresRepository.find({
      where: { futures_name: futures_name },
      take: 20,
      order: { futures_id: 'DESC' }
    });

    return futures;
  }
}
