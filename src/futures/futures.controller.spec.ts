import { Test, TestingModule } from '@nestjs/testing';
import { FuturesController } from './futures.controller';
import { FuturesService } from './futures.service';

describe('FuturesController', () => {
  let controller: FuturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuturesController],
      providers: [FuturesService],
    }).compile();

    controller = module.get<FuturesController>(FuturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
