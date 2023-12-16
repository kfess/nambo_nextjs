import { ZodError } from "zod";
import axios, { AxiosError } from "axios";
import {
  PaymentType,
  paymentSchema,
} from "@/features/Payment/paymentFormSchema";
import { UnknownError } from "@/helpers/error";

export const fetchPayments = async (
  eventId: string
): Promise<PaymentType[]> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/payment/?eventId=${encodeURIComponent(
        eventId
      )}`
    );
    return response.data
      ? response.data.map((payment: unknown) => paymentSchema.parse(payment))
      : [];
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error;
    } else if (error instanceof ZodError) {
      throw error;
    }
    throw new UnknownError();
  }
};
