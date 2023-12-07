type Member = {
  readonly name: string;
  readonly ratio: number;
};

type MoneyUnit = "1" | "10" | "100" | "1000";

export class Event {
  readonly eventId: string;
  readonly eventName: string;
  readonly memo: string;
  readonly fromDate: string;
  readonly toDate: string;
  readonly members: Member[];
  readonly moneyUnit: MoneyUnit;

  constructor(
    eventId: string,
    eventName: string,
    memo: string,
    fromDate: string,
    toDate: string,
    members: Member[],
    moneyUnit: MoneyUnit
  ) {
    this.eventId = eventId;
    this.eventName = eventName;
    this.memo = memo;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.members = members;
    this.moneyUnit = moneyUnit;
  }
}
