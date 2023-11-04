import { Module } from '@nestjs/common';
import { CrawlingService } from './crawling.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CrawlingService],
  exports: [CrawlingService],
})
export class CrawlingModule {}
