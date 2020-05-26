import { Test, TestingModule } from '@nestjs/testing';
import { AroundMeController } from './aroundme.controller';

describe('AroundMe Controller', () => {
  let controller: AroundMeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AroundMeController],
    }).compile();

    controller = module.get<AroundMeController>(AroundMeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
