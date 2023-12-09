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
    // body から eventId を取得して、DB からイベント情報を取得する

    res.status(200).json({
      eventId: "1",
      eventName: "モナちゃんの楽しいイベント",
      memo: "早く行きたい",
      fromDate: "2021-10-01",
      toDate: "2021-10-31",
      members: [
        { name: "もなこちゃん", ratio: 1 },
        { name: "もなこくん", ratio: 1 },
        { name: "モナモナ", ratio: 1 },
        { name: "ゴリお", ratio: 1 },
        { name: "ぶっち", ratio: 1 },
        { name: "もちもち", ratio: 1 },
        { name: "ぶっちゃん", ratio: 1 },
      ],
      moneyUnit: "10",
    });
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
