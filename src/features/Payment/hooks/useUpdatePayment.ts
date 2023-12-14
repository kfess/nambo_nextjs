import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { UpdatePaymentType } from "@/features/Payment/paymentFormSchema";

const updatePayment = async (payment: UpdatePaymentType) => {
  try {
    const response = await axios.put(
      `/api/payment?paymentId=${payment.paymentId}`,
      payment
    );
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

export const useUpdatePayment = () => {
  const router = useRouter();
  const { mutate, isLoading, error } = useMutation<
    UpdatePaymentType,
    Error,
    UpdatePaymentType
  >("updatePayment", updatePayment, {
    onSuccess: (data: UpdatePaymentType) => {
      router.push(`/event/${data.eventId}`);
    },
  });
  return { mutate, isLoading, error };
};
