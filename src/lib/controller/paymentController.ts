import { IPaymentService } from "@/lib/service/paymentService";
import { Payment } from "@/lib/domain/payment";
import {
  createPaymentSchema,
  CreatePaymentType,
} from "@/lib/domain/paymentSchema";
import { validate } from "@/lib/utils/validate";

export class PaymentController {
  constructor(private paymentService: IPaymentService) {}

  async createPayment(paymentData: CreatePaymentType) {
    try {
      // paymentData の入力値の検証
      const validatedPaymentData = await validate(
        createPaymentSchema,
        paymentData
      );
      return await this.paymentService.createPayment(validatedPaymentData);
    } catch (error: unknown) {
      throw new Error("");
    }
  }

  async getPayment(paymentId: string) {
    try {
      return await this.paymentService.getPayment(paymentId);
    } catch (error: unknown) {
      throw new Error("");
    }
  }

  async getPayments(eventId: string) {
    try {
      return await this.paymentService.getPayments(eventId);
    } catch (error: unknown) {
      throw new Error("");
    }
  }

  async updatePayment(paymentId: string, paymentData: Payment) {
    return await this.paymentService.updatePayment(paymentId, paymentData);
  }

  async deletePayment(paymentId: string) {
    return await this.paymentService.deletePayment(paymentId);
  }
}
