import {
  Body,
  Controller,
  Inject,
  Post,
  NotAcceptableException,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';
import { SchedulerRegistry } from '@nestjs/schedule';
import crawlingConfig from 'src/config/crawlingConfig';
import { ConfigType } from '@nestjs/config';
import { SuccessResponseDto } from 'src/futures/response/success-response.dto';

@Controller('batch')
export class BatchController {
  private readonly secretKey;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: WinstonLogger,
    @Inject(crawlingConfig.KEY)
    private config: ConfigType<typeof crawlingConfig>,
    private readonly scheduleRegistry: SchedulerRegistry,
  ) {
    this.secretKey = config.secretKey;
  }

  @Post('start')
  async start(@Body('secretKey') secretKey: string) {
    this.checkSecretKey(secretKey);

    const job = this.scheduleRegistry.getCronJob(this.config.batchName);

    job.start();

    this.logger.debug(
      `[${this.config.batchName}] start - ${new Date().toISOString()}`,
    );

    return new SuccessResponseDto();
  }

  @Post('stop')
  async stop(@Body('secretKey') secretKey: string) {
    this.checkSecretKey(secretKey);

    const job = this.scheduleRegistry.getCronJob(this.config.batchName);

    job.stop();

    this.logger.debug(
      `[${this.config.batchName}] stop - ${new Date().toISOString()}`,
    );

    return new SuccessResponseDto();
  }

  private checkSecretKey(secretKey: string) {
    if (secretKey !== this.secretKey) {
      const message = `[${
        this.config.batchName
      }] The secret key does not exist. - ${new Date().toISOString()}`;
      this.logger.error(message);

      throw new NotAcceptableException(message);
    }
  }
}
