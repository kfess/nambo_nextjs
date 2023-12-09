import { PrismaClient, Payment as PrismaPayment } from "@prisma/client";
import { Payment } from "@/lib/domain/payment";

export interface IPaymentRepository {
  createPayment: (paymentData: Payment) => Promise<PrismaPayment>;
  getPayment: (paymentId: string) => Promise<PrismaPayment | null>;
  getPayments: (eventId: string) => Promise<PrismaPayment[]>;
  updatePayment: (
    paymentId: string,
    paymentData: Payment
  ) => Promise<PrismaPayment>;
  deletePayment: (paymentId: string) => Promise<PrismaPayment>;
}

export class PaymentRepository implements IPaymentRepository {
  constructor(private prisma: PrismaClient) {}

  async createPayment(paymentData: Payment): Promise<
    PrismaPayment & {
      payees: {
        name: string;
      }[];
    }
  > {
    // paymentId is automatically generated by Prisma.
    // So, we don't need to pass it to the Prisma.
    return await this.prisma.payment.create({
      data: {
        eventId: paymentData.eventId,
        purpose: paymentData.purpose,
        payer: paymentData.payer,
        payees: {
          create: paymentData.payees.map((payee) => ({ name: payee })),
        },
        cost: paymentData.cost,
      },
      include: { payees: true },
    });
  }

  async getPayment(paymentId: string): Promise<PrismaPayment | null> {
    return await this.prisma.payment.findUnique({
      where: { paymentId },
      include: { payees: true },
    });
  }

  async getPayments(eventId: string): Promise<PrismaPayment[]> {
    return await this.prisma.payment.findMany({
      where: { eventId },
      include: { payees: true },
    });
  }

  async updatePayment(
    paymentId: string,
    paymentData: Payment
  ): Promise<PrismaPayment> {
    return await this.prisma.payment.update({
      where: { paymentId },
      data: {
        eventId: paymentData.eventId,
        purpose: paymentData.purpose,
        payer: paymentData.payer,
        payees: {
          create: paymentData.payees.map((payee) => ({ name: payee })),
        },
        cost: paymentData.cost,
      },
    });
  }

  async deletePayment(paymentId: string): Promise<PrismaPayment> {
    return await this.prisma.payment.delete({ where: { paymentId } });
  }
}
