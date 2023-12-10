import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { PaymentType } from "@/features/Payment/paymentFormSchema";

const deletePayment = async (paymentId: string) => {
  try {
    const response = await axios.delete(`/api/payment?paymentId=${paymentId}`);
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

export const useDeletePayment = () => {
  const router = useRouter();
  const { mutate, isLoading, error } = useMutation<PaymentType, Error, string>(
    "deletePayment",
    deletePayment,
    {
      onSuccess: (data: PaymentType) => {
        router.push(`/event/${data.eventId}`);
      },
    }
  );
  return { mutate, isLoading, error };
};
