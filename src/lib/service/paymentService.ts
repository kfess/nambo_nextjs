import { IPaymentRepository } from "@/lib/repository/paymentRepository";
import { Payment } from "@/lib/domain/payment";
import {
  PaymentType,
  CreatePaymentType,
  createPaymentSchema,
} from "@/lib/domain/paymentSchema";
import { validate } from "@/lib/utils/validate";

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
      // paymentData の入力値の検証
      const validatedPaymentData = await validate(
        createPaymentSchema,
        paymentData
      );
      return await this.paymentRepository.createPayment({
        ...validatedPaymentData,
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
