import type { NextApiRequest, NextApiResponse } from "next";
import { PaymentRepository, prisma } from "@/lib/repository";
import { PaymentService } from "@/lib/service";
import { PaymentController } from "@/lib/controller/paymentController";
import { isValidUUID } from "@/lib/utils/validate";

const paymentRepository = new PaymentRepository(prisma);
const paymentService = new PaymentService(paymentRepository);
const paymentController = new PaymentController(paymentService);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { eventId, paymentId } = req.query;

  if (req.method === "GET") {
    // 単一の支払いデータの取得ハンドラー
    if (paymentId) {
      if (typeof paymentId !== "string" || !isValidUUID(paymentId)) {
        res.status(400).json({ error: "Invalid paymentId is specified" });
      }

      const paymentData = await paymentController.getPayment(
        paymentId as string
      );
      res.status(200).json(paymentData);
    } else if (eventId) {
      // 複数の支払いデータの取得ハンドラー
      if (typeof eventId !== "string" || !isValidUUID(eventId)) {
        res.status(400).json({ error: "Invalid eventId is specified" });
      }

      const paymentData = await paymentController.getPayments(
        eventId as string
      );
      res.status(200).json(paymentData);
    }
  } else if (req.method === "POST") {
    // 支払いデータの作成ハンドラー
    try {
      const createdPaymentData = await paymentController.createPayment(
        req.body
      );
      res.status(200).json(createdPaymentData);
    } catch (error: unknown) {
      console.log("here", error);
      res.status(500).json({ error: "Unknown error" });
    }
  } else if (req.method === "PUT") {
    const { paymentId } = req.query;
    if (typeof paymentId !== "string" || !isValidUUID(paymentId)) {
      res.status(400).json({ error: "Invalid paymentId is specified" });
    }

    try {
      const updatedPaymentData = await paymentController.updatePayment(
        paymentId as string,
        req.body
      );
      res.status(200).json(updatedPaymentData);
    } catch (error: unknown) {
      console.log("here", error);
      res.status(500).json({ error: "Unknown error" });
    }
  } else if (req.method === "DELETE") {
    const { paymentId } = req.query;
    try {
      if (typeof paymentId !== "string" || !isValidUUID(paymentId)) {
        res.status(400).json({ error: "Invalid paymentId is specified" });
      }

      const deletedPaymentData = await paymentController.deletePayment(
        paymentId as string
      );
      res.status(200).json(deletedPaymentData);
    } catch (error: unknown) {
      console.log("here", error);
      res.status(500).json({ error: "Unknown error" });
    }
  }
}
