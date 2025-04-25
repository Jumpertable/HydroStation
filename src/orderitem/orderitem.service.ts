import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderItem } from './entities/orderitem.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { UpdateOrderitemDto } from './dto/update-orderitem.dto';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectModel(OrderItem)
    private readonly orderItemsModel: typeof OrderItem,
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
    @InjectModel(Product)
    private readonly productModel: typeof Product,
    @InjectModel(Customer)
    private readonly customerModel: typeof Customer,
  ) {}

  async create(createOrderItemDto: any) {
    const { cusID, productID, amount } = createOrderItemDto;

    const product = await this.productModel.findByPk(productID);
    if (!product || product.productStock < amount) {
      throw new NotFoundException(
        `Not enough stock for product ID ${productID}`,
      );
    }

    const customer = await this.customerModel.findByPk(cusID);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${cusID} not found`);
    }

    let order = await this.orderModel.findOne({
      where: {
        cusID,
        orderTotal: null,
      },
    });

    if (!order) {
      const newOrder = this.orderModel.build({
        cusID,
        orderTotal: null,
      } as any);
      await newOrder.save();
      order = newOrder;
    }

    const orderItemTotal = product.productPrice * amount;

    const orderItem = await this.orderItemsModel.create({
      orderID: order.orderID,
      productID,
      productName: product.productName,
      amount,
      productPrice: product.productPrice,
      cusID,
      cusName: customer.cusName,
    });

    await this.updateOrderTotal(order.orderID, orderItemTotal);

    product.productStock -= amount;
    await product.save();

    return orderItem;
  }

  private async updateOrderTotal(orderID: number, orderItemTotal: number) {
    const order = await this.orderModel.findByPk(orderID);
    if (order) {
      const currentTotal = order.orderTotal || 0;
      order.orderTotal = currentTotal + orderItemTotal;
      await order.save();
    }
  }

  async findAll() {
    return this.orderItemsModel.findAll({
      include: [
        { model: Product, required: true, attributes: ['productName'] },
        { model: Customer, required: true, attributes: ['cusName'] },
      ],
    });
  }

  async findOne(id: number) {
    const orderItem = await this.orderItemsModel.findByPk(id, {
      include: [Order, Product, Customer],
    });
    if (!orderItem) {
      throw new NotFoundException(`Order item with ID ${id} not found`);
    }
    return orderItem;
  }

  async findByOrder(orderID: number) {
    const orderItems = await this.orderItemsModel.findAll({
      where: { orderID },
      include: [Product, Customer],
    });

    if (!orderItems || orderItems.length === 0) {
      throw new NotFoundException(
        `No order items found for order ID ${orderID}`,
      );
    }

    return orderItems;
  }

  async update(id: number, dto: UpdateOrderitemDto) {
    const orderItem = await this.orderItemsModel.findByPk(id);
    if (!orderItem) {
      throw new NotFoundException(`Order item with ID ${id} not found`);
    }

    await orderItem.update(dto);
    return {
      message: `Order item ${id} updated successfully`,
      orderItem,
    };
  }
  async remove(id: number) {
    return this.orderItemsModel.destroy({
      where: { orderItemID: id },
    });
  }
}
