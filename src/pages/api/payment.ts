import type { NextApiRequest, NextApiResponse } from "next";
import { PaymentType } from "@/features/Payment/paymentFormSchema";
import { PaymentRepository, prisma } from "@/lib/repository";
import { PaymentService } from "@/lib/service";
import { PaymentController } from "@/lib/controller/paymentController";
import { isValidUUID } from "@/lib/utils/validate";

const paymentRepository = new PaymentRepository(prisma);
const paymentService = new PaymentService(paymentRepository);
const paymentController = new PaymentController(paymentService);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PaymentType[]>
) {
  if (req.method === "GET") {
    // body から eventId を取得して、DB から全ての支払い情報を取得する
    res.status(200).json([
      {
        eventId: "1",
        paymentId: "1",
        payer: "もなこちゃん",
        purpose: "世界一周旅行",
        payees: ["もなこくん", "もなこちゃん"],
        cost: 400,
      },
      {
        eventId: "1",
        paymentId: "2",
        payer: "もなこちゃん",
        purpose: "世界一周旅行",
        payees: ["もなこくん", "もなこちゃん"],
        cost: 50,
      },
      {
        eventId: "1",
        paymentId: "3",
        payer: "もなこちゃん",
        purpose: "世界一周旅行",
        payees: ["もなこくん", "もなこちゃん"],
        cost: 200,
      },
      {
        eventId: "1",
        paymentId: "4",
        payer: "もなこくん",
        purpose: "トイレ代",
        payees: ["もなこくん", "もなこちゃん"],
        cost: 800,
      },
      {
        eventId: "1",
        paymentId: "5",
        payer: "もなこくん",
        purpose: "トイレ代",
        payees: ["もなこちゃん"],
        cost: 200,
      },
      {
        eventId: "1",
        paymentId: "6",
        payer: "ゴリお",
        purpose: "トイレ代",
        payees: ["ぶっち"],
        cost: 200000,
      },
    ]);
  } else if (req.method === "POST") {
    // 支払いデータの作成ハンドラー
    try {
      const createdPaymentData = await paymentController.createPayment(
        req.body
      );
      res.status(200).json(createdPaymentData);
    } catch (error: unknown) {
      res.status(500).json({ error: "Unknown error" });
    }
  } else if (req.method === "PUT") {
    // body から eventId, paymentId を取得して、DB に支払い情報を更新する
  } else if (req.method === "DELETE") {
    // body から eventId, paymentId を取得して、DB から支払い情報を削除する
  }
}
