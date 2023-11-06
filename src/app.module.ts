import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { FuturesModule } from './futures/futures.module';
import { typeOrmConfig } from './config/typeOrmConfig';
import crawlingConfig from './config/crawlingConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./env/.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [crawlingConfig],
    }),
    FuturesModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
