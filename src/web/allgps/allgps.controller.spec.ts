import { Test, TestingModule } from '@nestjs/testing';
import { AllgpsController } from './allgps.controller';

describe('Allgps Controller', () => {
  let controller: AllgpsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllgpsController],
    }).compile();

    controller = module.get<AllgpsController>(AllgpsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
