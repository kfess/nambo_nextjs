export class Payment {
  readonly paymentId: string;
  readonly eventId: string;
  readonly purpose: string;
  readonly payer: string;
  readonly payees: string[];
  readonly cost: number;

  constructor(
    paymentId: string,
    eventId: string,
    purpose: string,
    payer: string,
    payees: string[],
    cost: number
  ) {
    this.paymentId = paymentId;
    this.eventId = eventId;
    this.purpose = purpose;
    this.payer = payer;
    this.payees = payees;
    this.cost = cost;
  }
}
