import { Module } from '@nestjs/common';
import { FuturesService } from './futures.service';
import { FuturesController } from './futures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Futures } from './entities/futures.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Futures])],
  controllers: [FuturesController],
  providers: [FuturesService],
})
export class FuturesModule {}
