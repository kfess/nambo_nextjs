import { IPaymentRepository } from "@/lib/repository/paymentRepository";
import { Payment } from "@/lib/domain/payment";
import { PaymentType, CreatePaymentType } from "@/lib/domain/paymentSchema";

export interface IPaymentService {
  createPayment: (paymentData: CreatePaymentType) => Promise<PaymentType>;
  getPayment: (paymentId: string) => Promise<PaymentType | null>;
  getPayments: (eventId: string) => Promise<PaymentType[]>;
  updatePayment: (
    paymentId: string,
    paymentData: Payment
  ) => Promise<PaymentType>;
  deletePayment: (paymentId: string) => Promise<PaymentType>;
}

export class PaymentService implements IPaymentService {
  constructor(private paymentRepository: IPaymentRepository) {}

  async createPayment(paymentData: CreatePaymentType): Promise<PaymentType> {
    try {
      return await this.paymentRepository.createPayment({
        ...paymentData,
      });
    } catch (error: unknown) {
      console.log(error);
      throw new Error("");
    }
  }

  async getPayment(paymentId: string): Promise<PaymentType | null> {
    return await this.paymentRepository.getPayment(paymentId);
  }

  async getPayments(eventId: string): Promise<PaymentType[]> {
    return await this.paymentRepository.getPayments(eventId);
  }

  async updatePayment(
    paymentId: string,
    paymentData: Payment
  ): Promise<PaymentType> {
    return await this.paymentRepository.updatePayment(paymentId, paymentData);
  }

  async deletePayment(paymentId: string): Promise<PaymentType> {
    return await this.paymentRepository.deletePayment(paymentId);
  }
}
