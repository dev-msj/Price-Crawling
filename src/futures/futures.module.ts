import { Module } from '@nestjs/common';
import { FuturesService } from './futures.service';
import { FuturesController } from './futures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Futures } from './entities/futures.entity';
import { CrawlingModule } from 'src/crawling/crawling.module';

@Module({
  imports: [CrawlingModule, TypeOrmModule.forFeature([Futures])],
  controllers: [FuturesController],
  providers: [FuturesService],
  exports: [FuturesService],
})
export class FuturesModule {}
