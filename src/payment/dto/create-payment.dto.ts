export class CreatePaymentDto {
  cusID: number;
  orderID: number;
  payMethod: string;
  payTrans: string;
  amount: number;
}
