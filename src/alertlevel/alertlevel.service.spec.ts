import { Test, TestingModule } from '@nestjs/testing';
import { AlertlevelService } from './alertlevel.service';

describe('AlertlevelService', () => {
  let service: AlertlevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlertlevelService],
    }).compile();

    service = module.get<AlertlevelService>(AlertlevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
