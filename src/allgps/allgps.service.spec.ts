import { Test, TestingModule } from '@nestjs/testing';
import { AllgpsService } from './allgps.service';

describe('AllgpsService', () => {
  let service: AllgpsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllgpsService],
    }).compile();

    service = module.get<AllgpsService>(AllgpsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
