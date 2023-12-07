import { PrismaClient, Payment as PrismaPayment } from "@prisma/client";
import { Payment } from "@/lib/domain/payment";

interface IPaymentRepository {
  createPayment: (paymentData: Payment) => Promise<PrismaPayment>;
  getPayment: (id: number) => Promise<PrismaPayment>;
  getPayments: (eventId: number) => Promise<PrismaPayment[]>;
  updatePayment: (id: number, paymentData: Payment) => Promise<PrismaPayment>;
  deletePayment: (id: number) => Promise<PrismaPayment>;
}

export class PaymentRepository implements IPaymentRepository {
  constructor(private prisma: PrismaClient) {}

  async createPayment(paymentData: Payment): Promise<PrismaPayment> {
    return await this.prisma.payment.create({
      data: {
        ...paymentData,
      },
    });
  }

  async getPayment(id: number): Promise<PrismaPayment> {
    return await this.prisma.payment.findUnique({ where: { id } });
  }

  async getPayments(eventId: number): Promise<PrismaPayment[]> {
    return await this.prisma.payment.findMany({ where: { eventId } });
  }

  async updatePayment(
    id: number,
    paymentData: Payment
  ): Promise<PrismaPayment> {
    return await this.prisma.payment.update({
      where: { id },
      data: {
        ...paymentData,
      },
    });
  }
}
