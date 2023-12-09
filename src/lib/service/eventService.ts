import { IEventRepository } from "@/lib/repository/eventRepository";
import { Event } from "@/lib/domain/event";
import { CreateEventType } from "@/lib/domain/eventSchema";
import { EventType } from "@/lib/domain/eventSchema";

export interface IEventService {
  createEvent: (eventData: CreateEventType) => Promise<EventType>;
  getEvent: (eventId: string) => Promise<EventType | null>;
  updateEvent: (eventId: string, eventData: Event) => Promise<EventType>;
}

export class EventService implements IEventService {
  constructor(private eventRepository: IEventRepository) {}

  async createEvent(eventData: CreateEventType): Promise<EventType> {
    try {
      return await this.eventRepository.createEvent({
        memo: eventData.memo ?? "",
        ...eventData,
      });
    } catch (error: unknown) {
      throw new Error("");
    }
  }

  async getEvent(eventId: string): Promise<EventType | null> {
    try {
      return await this.eventRepository.getEvent(eventId);
    } catch (error: unknown) {
      throw new Error("");
    }
  }

  async updateEvent(eventId: string, eventData: Event): Promise<EventType> {
    try {
      return await this.eventRepository.updateEvent(eventId, eventData);
    } catch (error: unknown) {
      throw new Error("");
    }
  }
}
