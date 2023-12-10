import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { CreatePaymentType } from "@/features/Payment/paymentFormSchema";

const addPayment = async (payment: CreatePaymentType) => {
  try {
    const response = await axios.post("/api/payment", payment);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.error);
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
};

export const useAddPayment = () => {
  const router = useRouter();
  const { mutate, isLoading, error } = useMutation<
    CreatePaymentType,
    Error,
    CreatePaymentType
  >("addPayment", addPayment, {
    onSuccess: (data: CreatePaymentType) => {
      router.push(`/event/${data.eventId}`);
    },
  });
  return { mutate, isLoading, error };
};
