import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FuturesModule } from './futures/futures.module';

@Module({
  imports: [FuturesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
