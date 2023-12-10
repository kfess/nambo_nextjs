import { ZodError } from "zod";
import { IEventRepository } from "@/lib/repository/eventRepository";
import { IPaymentRepository } from "@/lib/repository/paymentRepository";
import {
  createEventSchema,
  CreateEventType,
  generateEditEventSchema,
  EventType,
} from "@/lib/domain/eventSchema";
import { validate } from "@/lib/utils/validate";

export interface IEventService {
  createEvent: (eventData: CreateEventType) => Promise<EventType>;
  getEvent: (eventId: string) => Promise<EventType | null>;
  updateEvent: (eventId: string, eventData: EventType) => Promise<EventType>;
}

export class EventService implements IEventService {
  constructor(
    private eventRepository: IEventRepository,
    private paymentRepository: IPaymentRepository
  ) {}

  async createEvent(eventData: CreateEventType): Promise<EventType> {
    try {
      // eventData の入力値の検証
      const validatedEventData = await validate(createEventSchema, eventData);
      return await this.eventRepository.createEvent({
        ...validatedEventData,
        memo: validatedEventData.memo ?? "",
      });
    } catch (error: unknown) {
      console.log("error!", error);
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

  async updateEvent(eventId: string, eventData: EventType): Promise<EventType> {
    try {
      // 支払いに関与しているユーザーは、削除できないことを検証
      const involvedMembers =
        await this.paymentRepository.getInvolvedMembers(eventId);
      const updateEventSchema = generateEditEventSchema(involvedMembers);

      // eventData の入力値の検証
      const validatedEventData = await validate(updateEventSchema, eventData);

      return await this.eventRepository.updateEvent(eventId, {
        ...validatedEventData,
      });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        console.log(error);
        throw new Error("");
      }
      throw new Error("");
    }
  }
}
