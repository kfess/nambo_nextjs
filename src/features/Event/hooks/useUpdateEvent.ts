import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { EditEventType } from "@/features/Event/eventSchema";

const updateEvent = async (event: EditEventType) => {
  try {
    const response = await axios.put(
      `/api/event?eventId=${event.eventId}`,
      event
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

export const useUpdateEvent = () => {
  const router = useRouter();
  const { mutate, isLoading, error } = useMutation<
    EditEventType,
    Error,
    EditEventType
  >("updateEvent", updateEvent, {
    onSuccess: (data: EditEventType) => {
      router.push(`/event/${data.eventId}`);
    },
  });
  return { mutate, isLoading, error };
};
