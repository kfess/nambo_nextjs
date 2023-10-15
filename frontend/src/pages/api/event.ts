import type { NextApiRequest, NextApiResponse } from "next";
import { EventType } from "../../features/Event/eventSchema";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventType>
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
        { name: "モナちゃん", ratio: 1 },
        { name: "モナコくん", ratio: 1 },
      ],
      moneyUnit: "1",
    });
  } else if (req.method === "POST") {
  }
}
