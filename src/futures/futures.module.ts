import { Module } from '@nestjs/common';
import { FuturesService } from './futures.service';
import { FuturesController } from './futures.controller';

@Module({
  controllers: [FuturesController],
  providers: [FuturesService],
})
export class FuturesModule {}
