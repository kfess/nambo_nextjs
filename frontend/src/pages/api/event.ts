import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { EventType } from "../../features/Event/eventSchema";
import { createEventSchema } from "../../features/Event/eventSchema";

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
    // validation of request body
    try {
      await createEventSchema.parseAsync(req.body);
      // TODO: DB にイベント情報を保存する
      res.status(201).json({ ...req.body, eventId: "1" } as EventType);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Failed to validate your request." });
      } else {
        res.status(500).json({ error: "Unknown error" });
      }
    }
  } else if (req.method === "PUT") {
  }
}
