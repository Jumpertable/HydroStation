export class CreatePaymentDto {
  cusID: number;
  orderID: number;
  payMethod: string;
  payTrans: string;
  payAmount: number;
}
