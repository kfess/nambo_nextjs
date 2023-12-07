import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { CreateEventType, EventType } from "../eventSchema";

const addEvent = async (event: CreateEventType) => {
  try {
    const response = await axios.post("/api/event", event);
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

export const useAddEvent = () => {
  const router = useRouter();
  const { mutate, isLoading, error } = useMutation<
    EventType,
    Error,
    CreateEventType
  >("addEvent", addEvent, {
    onSuccess: (data: EventType) => {
      router.push(`/event/${data.eventId}`);
    },
  });
  return { mutate, isLoading, error };
};
