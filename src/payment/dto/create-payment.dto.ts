export class CreatePaymentDto {
  orderID: number;
  payMethod: string;
  payTrans?: string;
  amount: number;
}
