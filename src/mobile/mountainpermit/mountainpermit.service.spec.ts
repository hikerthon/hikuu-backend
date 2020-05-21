import { Test, TestingModule } from '@nestjs/testing';
import { MountainpermitService } from './mountainpermit.service';

describe('MountainpermitService', () => {
  let service: MountainpermitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MountainpermitService],
    }).compile();

    service = module.get<MountainpermitService>(MountainpermitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
