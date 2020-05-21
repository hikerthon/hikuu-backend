import { Test, TestingModule } from '@nestjs/testing';
import { MountainpermitController } from './mountainpermit.controller';

describe('Mountainpermit Controller', () => {
  let controller: MountainpermitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MountainpermitController],
    }).compile();

    controller = module.get<MountainpermitController>(MountainpermitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
