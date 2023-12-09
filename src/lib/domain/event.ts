import { EventType, Member, MoneyUnit } from "@/lib/domain/eventSchema";

export class Event implements EventType {
  readonly eventId: string;
  readonly eventName: string;
  readonly memo: string;
  readonly fromDate: string;
  readonly toDate: string;
  readonly members: Member[];
  readonly moneyUnit: MoneyUnit;

  constructor(eventData: EventType) {
    this.eventId = eventData.eventId;
    this.eventName = eventData.eventName;
    this.memo = eventData.memo ?? "";
    this.fromDate = eventData.fromDate;
    this.toDate = eventData.toDate;
    this.members = eventData.members;
    this.moneyUnit = eventData.moneyUnit ?? "10";
  }
}
