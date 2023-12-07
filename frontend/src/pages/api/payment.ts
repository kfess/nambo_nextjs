import type { NextApiRequest, NextApiResponse } from "next";
import { PaymentType } from "@/features/Payment/paymentFormSchema";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PaymentType[]>
) {
  if (req.method === "GET") {
    // body から eventId を取得して、DB から全ての支払い情報を取得する
    res.status(200).json([
      {
        eventId: "1",
        paymentId: "1",
        name: "もなこちゃん",
        purpose: "世界一周旅行",
        otherNames: ["もなこくん", "もなこちゃん"],
        cost: 400,
      },
      {
        eventId: "1",
        paymentId: "2",
        name: "もなこちゃん",
        purpose: "世界一周旅行",
        otherNames: ["もなこくん", "もなこちゃん"],
        cost: 50,
      },
      {
        eventId: "1",
        paymentId: "3",
        name: "もなこちゃん",
        purpose: "世界一周旅行",
        otherNames: ["もなこくん", "もなこちゃん"],
        cost: 200,
      },
      {
        eventId: "1",
        paymentId: "4",
        name: "もなこくん",
        purpose: "トイレ代",
        otherNames: ["もなこくん", "もなこちゃん"],
        cost: 800,
      },
      {
        eventId: "1",
        paymentId: "5",
        name: "もなこくん",
        purpose: "トイレ代",
        otherNames: ["もなこちゃん"],
        cost: 200,
      },
      {
        eventId: "1",
        paymentId: "6",
        name: "ゴリお",
        purpose: "トイレ代",
        otherNames: ["ぶっち"],
        cost: 200000,
      },
    ]);
  } else if (req.method === "POST") {
    // body から eventId, paymentId を取得して、DB に支払い情報を追加する
  } else if (req.method === "PUT") {
    // body から eventId, paymentId を取得して、DB に支払い情報を更新する
  } else if (req.method === "DELETE") {
    // body から eventId, paymentId を取得して、DB から支払い情報を削除する
  }
}
