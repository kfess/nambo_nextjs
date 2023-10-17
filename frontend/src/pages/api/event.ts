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
  }
}
