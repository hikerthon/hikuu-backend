import { Test, TestingModule } from '@nestjs/testing';
import { AroundMeService } from './aroundme.service';

describe('AroundMe Service', () => {
  let service: AroundMeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AroundMeService],
    }).compile();

    service = module.get<AroundMeService>(AroundMeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
