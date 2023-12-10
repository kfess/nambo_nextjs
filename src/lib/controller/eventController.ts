import { IEventService } from "@/lib/service/eventService";
import { Event } from "@/lib/domain/event";
import { createEventSchema, CreateEventType } from "@/lib/domain/eventSchema";
import { validate } from "@/lib/utils/validate";

export class EventController {
  constructor(private eventService: IEventService) {}

  async createEvent(eventData: CreateEventType) {
    try {
      // eventData の入力値の検証
      const validatedEventData = await validate(createEventSchema, eventData);
      return await this.eventService.createEvent(validatedEventData);
    } catch (error: unknown) {
      console.log(error);
    }
  }

  async getEvent(eventId: string) {
    try {
      return await this.eventService.getEvent(eventId);
    } catch (error: unknown) {
      console.log(error);
    }
  }

  async updateEvent(eventId: string, eventData: Event) {
    try {
      // eventData の入力値の検証
      const validatedEventData = await validate(createEventSchema, eventData);
      // 支払いに関与しているユーザーは、削除できないことを検証
      return await this.eventService.updateEvent(eventId, eventData);
    } catch (error: unknown) {}
  }
}
