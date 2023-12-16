import { IEventService } from "@/lib/service/eventService";
import { CreateEventType, EventType } from "@/lib/domain/eventSchema";

export class EventController {
  constructor(private eventService: IEventService) {}

  async createEvent(eventData: CreateEventType) {
    try {
      return await this.eventService.createEvent(eventData);
    } catch (error: unknown) {
      console.log(error);
      throw new Error("");
    }
  }

  async getEvent(eventId: string) {
    try {
      return await this.eventService.getEvent(eventId);
    } catch (error: unknown) {
      throw new Error("");
    }
  }

  async updateEvent(eventId: string, eventData: EventType) {
    try {
      return await this.eventService.updateEvent(eventId, eventData);
    } catch (error: unknown) {
      console.log(error);
      throw new Error("");
    }
  }
}
