import { ZodError } from "zod";
import axios, { AxiosError } from "axios";
import { EventType, eventSchema } from "@/features/Event/eventSchema";
import { UnknownError } from "@/helpers/error";

export const fetchEvent = async (eventId: string): Promise<EventType> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/event/?eventId=${encodeURIComponent(eventId)}`
    );
    const event = eventSchema.parse(response.data);
    return event;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error;
    } else if (error instanceof ZodError) {
      throw error;
    }
    throw new UnknownError();
  }
};
