import { Injectable } from '@nestjs/common';
import { CreateFutureDto } from './dto/create-futures.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Futures } from './entities/futures.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class FuturesService {
  constructor(
    @InjectRepository(Futures)
    private futuresRepository: Repository<Futures>,
  ) {}
  create(createFutureDto: CreateFutureDto) {
    return 'This action adds a new future';
  }

  async findFutures(futures_name: string): Promise<Array<Futures>> {
    const futures = await this.futuresRepository.find({
      where: { futures_name: futures_name },
      take: 20,
      order: { futures_id: 'DESC' },
    });

    return futures;
  }

  async findFuturesByPeriod(
    futures_name: string,
    start_date: string,
    end_date: string,
  ): Promise<Array<Futures>> {
    const futures = await this.futuresRepository.find({
      where: {
        futures_id:
          LessThanOrEqual(this.parseStringDateToFuturesIdFormat(end_date)) &&
          MoreThanOrEqual(this.parseStringDateToFuturesIdFormat(start_date)),
        futures_name: futures_name,
      },
      take: 20,
      order: { futures_id: 'DESC' },
    });

    return futures;
  }

  private parseStringDateToFuturesIdFormat(stringDate: string): number {
    return new Date(stringDate).getTime() / 1000;
  }
}
