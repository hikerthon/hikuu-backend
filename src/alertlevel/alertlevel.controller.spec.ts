import { Test, TestingModule } from '@nestjs/testing';
import { AlertlevelController } from './alertlevel.controller';

describe('Alertlevel Controller', () => {
  let controller: AlertlevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlertlevelController],
    }).compile();

    controller = module.get<AlertlevelController>(AlertlevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
