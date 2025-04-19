export class CreateOrderDto {
  cusID: number;
  items: {
    productID: number;
    amount: number;
  }[];
}
