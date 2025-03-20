import { Test, TestingModule } from '@nestjs/testing';
import { InvAlertsService } from './inv-alerts.service';

describe('InvAlertsService', () => {
  let service: InvAlertsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvAlertsService],
    }).compile();

    service = module.get<InvAlertsService>(InvAlertsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
