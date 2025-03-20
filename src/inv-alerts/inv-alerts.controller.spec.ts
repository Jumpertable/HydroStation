import { Test, TestingModule } from '@nestjs/testing';
import { InvAlertsController } from './inv-alerts.controller';
import { InvAlertsService } from './inv-alerts.service';

describe('InvAlertsController', () => {
  let controller: InvAlertsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvAlertsController],
      providers: [InvAlertsService],
    }).compile();

    controller = module.get<InvAlertsController>(InvAlertsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
