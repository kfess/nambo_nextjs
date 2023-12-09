import { Event as PrismaEvent } from "@prisma/client";
import { IEventRepository } from "@/lib/repository/eventRepository";
import { Event } from "@/lib/domain/event";
import { CreateEventType } from "@/lib/domain/eventSchema";

export interface IEventService {
  createEvent: (eventData: CreateEventType) => Promise<PrismaEvent>;
  getEvent: (eventId: string) => Promise<PrismaEvent | null>;
  updateEvent: (eventId: string, eventData: Event) => Promise<PrismaEvent>;
}

export class EventService implements IEventService {
  constructor(private eventRepository: IEventRepository) {}

  async createEvent(eventData: CreateEventType): Promise<PrismaEvent> {
    try {
      return await this.eventRepository.createEvent({
        eventId: "",
        memo: eventData.memo ?? "",
        ...eventData,
      });
    } catch (error: unknown) {
      throw new Error("");
    }
  }

  async getEvent(eventId: string): Promise<PrismaEvent | null> {
    return await this.eventRepository.getEvent(eventId);
  }

  async updateEvent(eventId: string, eventData: Event): Promise<PrismaEvent> {
    // eventData の入力値の検証
    // ToDo

    return await this.eventRepository.updateEvent(eventId, eventData);
  }
}
