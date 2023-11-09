import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { FuturesModule } from './futures/futures.module';
import { typeOrmConfig } from './config/typeOrmConfig';
import crawlingConfig from './config/crawlingConfig';
import * as winston from 'winston';
import { WinstonModule, utilities } from 'nest-winston';
import { BatchModule } from './scheduler/batch.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./env/.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [crawlingConfig],
    }),
    FuturesModule,
    BatchModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike('FuturesDB_UpdateBatch', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
