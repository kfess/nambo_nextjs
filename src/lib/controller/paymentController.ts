import { IPaymentService } from "@/lib/service/paymentService";
import { Payment } from "@/lib/domain/payment";

export class PaymentController {
  constructor(private paymentService: IPaymentService) {}

  async createPayment(paymentData: Payment) {
    return await this.paymentService.createPayment(paymentData);
  }

  async getPayment(paymentId: string) {
    return await this.paymentService.getPayment(paymentId);
  }

  async getPayments(eventId: string) {
    return await this.paymentService.getPayments(eventId);
  }

  async updatePayment(paymentId: string, paymentData: Payment) {
    return await this.paymentService.updatePayment(paymentId, paymentData);
  }

  async deletePayment(paymentId: string) {
    return await this.paymentService.deletePayment(paymentId);
  }
}
