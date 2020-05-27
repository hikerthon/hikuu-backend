import { Test, TestingModule } from '@nestjs/testing';
import { CheckInService } from './checkin.service';

describe('CheckInService', () => {
  let service: CheckInService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckInService],
    }).compile();

    service = module.get<CheckInService>(CheckInService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
