import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';
import crawlingConfig from 'src/config/crawlingConfig';
import { FuturesService } from 'src/futures/futures.service';

@Injectable()
export class BatchService {

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: WinstonLogger,
    @Inject(crawlingConfig.KEY)
    private config: ConfigType<typeof crawlingConfig>,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly futuresService: FuturesService,
  ) {
    this.addCronJob();
  }

  private addCronJob() {
    const job = new CronJob('0 0 2 1 * *', () => {
      this.requestApi();
    });

    this.schedulerRegistry.addCronJob(this.config.batchName, job);

    this.logger.debug(`batch job [${this.config.batchName}] is created...`);
  }

  private async requestApi() {
    for (let i = 0; i < 20; i++) {
      try {
        this.futuresService.startFuturesDBUpdate();

        this.logger.debug(
          `[${
            this.config.batchName
          }] Futures Data Update Success! - [${new Date().toISOString()}]`,
        );

        break;
      } catch (e) {
        this.logger.error(
          `[${
            this.config.batchName
          }] Futures Data Update Failure... - [${new Date().toISOString()}]
          message: ${e}
          try: ${i}`,
        );
      }
    }
  }
}
