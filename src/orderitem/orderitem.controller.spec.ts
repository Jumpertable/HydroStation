import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemsController } from './orderitem.controller';
import { OrderItemsService } from './orderitem.service';

describe('OrderitemController', () => {
  let controller: OrderItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderItemsController],
      providers: [OrderItemsService],
    }).compile();

    controller = module.get<OrderItemsController>(OrderItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
