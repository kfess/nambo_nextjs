import { Payment as PrismaPayment } from "@prisma/client";
import { IPaymentRepository } from "@/lib/repository/paymentRepository";
import { Payment } from "@/lib/domain/payment";
import { CreatePaymentType } from "@/lib/domain/paymentSchema";

export interface IPaymentService {
  createPayment: (paymentData: CreatePaymentType) => Promise<PrismaPayment>;
  getPayment: (paymentId: string) => Promise<PrismaPayment | null>;
  getPayments: (eventId: string) => Promise<PrismaPayment[]>;
  updatePayment: (
    paymentId: string,
    paymentData: Payment
  ) => Promise<PrismaPayment>;
  deletePayment: (paymentId: string) => Promise<PrismaPayment>;
}

export class PaymentService implements IPaymentService {
  constructor(private paymentRepository: IPaymentRepository) {}

  async createPayment(paymentData: CreatePaymentType): Promise<PrismaPayment> {
    try {
      return await this.paymentRepository.createPayment({
        ...paymentData,
      });
    } catch (error: unknown) {
      console.log(error);
      throw new Error("");
    }
  }

  async getPayment(paymentId: string): Promise<PrismaPayment | null> {
    return await this.paymentRepository.getPayment(paymentId);
  }

  async getPayments(eventId: string): Promise<PrismaPayment[]> {
    return await this.paymentRepository.getPayments(eventId);
  }

  async updatePayment(
    paymentId: string,
    paymentData: Payment
  ): Promise<PrismaPayment> {
    return await this.paymentRepository.updatePayment(paymentId, paymentData);
  }

  async deletePayment(paymentId: string): Promise<PrismaPayment> {
    return await this.paymentRepository.deletePayment(paymentId);
  }
}
