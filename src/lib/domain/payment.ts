import { PaymentType } from "@/lib/domain/paymentSchema";

export class Payment implements PaymentType {
  readonly paymentId: string;
  readonly eventId: string;
  readonly purpose: string;
  readonly payer: string;
  readonly payees: string[];
  readonly cost: number;

  constructor(paymentData: PaymentType) {
    this.paymentId = paymentData.paymentId;
    this.eventId = paymentData.eventId;
    this.purpose = paymentData.purpose;
    this.payer = paymentData.payer;
    this.payees = paymentData.payees;
    this.cost = paymentData.cost;
  }
}
