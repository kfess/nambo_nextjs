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
        memo: eventData.memo ?? "",
        ...eventData,
      });
    } catch (error: unknown) {
      throw new Error("");
    }
  }

  async getEvent(eventId: string): Promise<PrismaEvent | null> {
    try {
      return await this.eventRepository.getEvent(eventId);
    } catch (error: unknown) {
      throw new Error("");
    }
  }

  async updateEvent(eventId: string, eventData: Event): Promise<PrismaEvent> {
    try {
      return await this.eventRepository.updateEvent(eventId, eventData);
    } catch (error: unknown) {
      throw new Error("");
    }
  }
}
