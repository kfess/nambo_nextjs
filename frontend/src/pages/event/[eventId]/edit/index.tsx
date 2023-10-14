import React from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TermsLink } from "../../../../features/Terms/components/TermsLink";
import { Header } from "../../../../features/Event/components/Header";
import {
  createEventSchema,
  EventType,
} from "../../../../features/Event/eventSchema";
import { EventName } from "../../../../features/Event/components/EventName";
import { Memo } from "../../../../features/Event/components/Memo";
import { StartEndDatePicker } from "../../../../features/Event/components/DatePicker";
import { Member } from "../../../../features/Event/components/Member";
import { MoneyUnit } from "../../../../features/Event/components/MoneyUnit";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";

export default function EditEventPage() {
  const router = useRouter();
  const { eventId } = router.query;

  const [eventInfo] = useLocalStorage<EventType>(`eventInfo_${eventId}`);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventType>({
    defaultValues: {
      eventName: eventInfo.eventName,
      memo: eventInfo.memo,
      fromDate: eventInfo.fromDate,
      toDate: eventInfo.toDate,
      members: eventInfo.members,
      moneyUnit: eventInfo.moneyUnit,
    },
    resolver: zodResolver(createEventSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
  });

  const { push } = useRouter();

  const onSubmit: SubmitHandler<EventType> = async (data: EventType) => {
    // await postEventData(
    //   `${process.env.REACT_APP_DB_EVENT_BASE_URL}/create/`,
    //   data
    // );
    // setTimeout(() => {
    //   navigate(`/event/${data.eventId}`, { replace: true });
    // }, 2 * 1000);
    console.log(data);
    push("/event/1");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header formPageType="edit" />
        <div className="container mx-auto px-5">
          <EventName control={control} errors={errors} />
          <Memo control={control} errors={errors} />
          <StartEndDatePicker control={control} errors={errors} />
          <Member control={control} errors={errors} />
          <MoneyUnit control={control} errors={errors} />
          <div className="text-center text-sm">
            <TermsLink inFooter={false} />
            に同意のうえ
          </div>
          <div className="flex flex-row w-full space-x-2 mt-2">
            <button
              className="btn w-1/2 no-animation"
              onClick={() => {
                push(`/event/${eventInfo.eventId}`);
              }}
            >
              キャンセル
            </button>
            <button
              className="btn w-1/2 bg-primary hover:bg-primary-hover text-white no-animation"
              onClick={() => {
                push(`/event/${eventInfo.eventId}`);
              }}
            >
              更新
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
