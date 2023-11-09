import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchController } from './batch.controller';
import { HttpModule } from '@nestjs/axios';
import { BatchService } from './batch.service';
import { FuturesModule } from 'src/futures/futures.module';

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule, FuturesModule],
  controllers: [BatchController],
  providers: [BatchService],
})
export class BatchModule {}
