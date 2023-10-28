import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FuturesModule } from './futures/futures.module';

@Module({
  imports: [FuturesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
