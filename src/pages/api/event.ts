import type { NextApiRequest, NextApiResponse } from "next";
import { EventRepository, prisma } from "@/lib/repository";
import { EventService } from "@/lib/service";
import { EventController } from "@/lib/controller/eventController";

const eventRepository = new EventRepository(prisma);
const eventService = new EventService(eventRepository);
const eventController = new EventController(eventService);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const eventId = req.query.eventId;
      const eventData = await eventController.getEvent(eventId as string);
      res.status(200).json(eventData);
    } catch (error: unknown) {
      res.status(500).json({ error: "Unknown error" });
    }
  } else if (req.method === "POST") {
    try {
      const createdEventData = await eventController.createEvent(req.body);
      res.status(200).json(createdEventData);
    } catch (error: unknown) {
      res.status(500).json({ error: "Unknown error" });
    }
  } else if (req.method === "PUT") {
  }
}
