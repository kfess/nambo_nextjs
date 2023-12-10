import type { NextApiRequest, NextApiResponse } from "next";
import { EventRepository, PaymentRepository, prisma } from "@/lib/repository";
import { EventService } from "@/lib/service";
import { EventController } from "@/lib/controller/eventController";
import { isValidUUID } from "@/lib/utils/validate";

const eventRepository = new EventRepository(prisma);
const paymentRepository = new PaymentRepository(prisma);
const eventService = new EventService(eventRepository, paymentRepository);
const eventController = new EventController(eventService);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // イベントデータの取得ハンドラー
    try {
      const eventId = req.query.eventId; // クエリパラメータから eventId を取得
      if (typeof eventId !== "string" || !isValidUUID(eventId)) {
        res.status(400).json({ error: "Invalid eventId is specified" });
        return;
      }

      const eventData = await eventController.getEvent(eventId as string);

      res.status(200).json(eventData);
    } catch (error: unknown) {
      res.status(500).json({ error: "Unknown error" });
    }
  } else if (req.method === "POST") {
    // イベントデータの作成ハンドラー
    try {
      const createdEventData = await eventController.createEvent(req.body);
      res.status(200).json(createdEventData);
    } catch (error: unknown) {
      res.status(500).json({ error: "Unknown error" });
    }
  } else if (req.method === "PUT") {
    // イベントデータの更新ハンドラー
    try {
      const eventId = req.query.eventId; // クエリパラメータから eventId を取得
      if (typeof eventId !== "string" || !isValidUUID(eventId)) {
        res.status(400).json({ error: "Invalid eventId is specified" });
        return;
      }

      const updatedEventData = await eventController.updateEvent(
        eventId as string,
        req.body
      );
      res.status(200).json(updatedEventData);
    } catch (error: unknown) {
      res.status(500).json({ error: "Unknown error" });
    }
  }
}
