import { Test, TestingModule } from '@nestjs/testing';
import { EventtypeController } from './eventtype.controller';

describe('Eventtype Controller', () => {
  let controller: EventtypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventtypeController],
    }).compile();

    controller = module.get<EventtypeController>(EventtypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
