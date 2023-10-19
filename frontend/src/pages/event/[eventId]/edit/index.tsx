import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TermsLink } from "../../../../features/Terms/components/TermsLink";
import { Header } from "../../../../features/Event/components/Header";
import {
  EventType,
  generateEditEventSchema,
} from "../../../../features/Event/eventSchema";
import { EventName } from "../../../../features/Event/components/EventName";
import { Memo } from "../../../../features/Event/components/Memo";
import { StartEndDatePicker } from "../../../../features/Event/components/DatePicker";
import { MoneyUnit } from "../../../../features/Event/components/MoneyUnit";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { PaymentType } from "../../../../features/Payment/paymentFormSchema";
import { MemberInEditMode } from "../../../../features/Event/components/MemberInEditMode";
import dayjs from "dayjs";

export default function EditEventPage() {
  const router = useRouter();
  const { eventId } = router.query;

  const [eventInfo] = useLocalStorage<EventType>(`eventInfo_${eventId}`);
  const [paymentInfo] = useLocalStorage<PaymentType[]>(
    `paymentInfo_${eventId}`
  );

  const unEditableMembers = Array.from(
    (paymentInfo ?? []).reduce((set, payment) => {
      set.add(payment.name);
      payment.otherNames.forEach((name) => set.add(name));
      return set;
    }, new Set<string>())
  );
  const editEventSchema = generateEditEventSchema(unEditableMembers);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<EventType>({
    defaultValues: {
      eventName: eventInfo?.eventName,
      memo: eventInfo?.memo,
      fromDate: eventInfo?.fromDate ?? dayjs().format("YYYY/MM/DD"),
      toDate: eventInfo?.toDate ?? dayjs().format("YYYY/MM/DD"),
      members: eventInfo?.members,
      moneyUnit: eventInfo?.moneyUnit,
    },
    resolver: zodResolver(editEventSchema),
    mode: "onSubmit",
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

  useEffect(() => {
    if (eventInfo && paymentInfo) {
      setValue("eventName", eventInfo.eventName);
      setValue("memo", eventInfo.memo);
      setValue("fromDate", eventInfo.fromDate);
      setValue("toDate", eventInfo.toDate);
      setValue("members", eventInfo.members);
      setValue("moneyUnit", eventInfo.moneyUnit);
    }
  }, [eventInfo, paymentInfo, setValue]);

  if (!router.isReady || !eventInfo || !paymentInfo) {
    return null;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header formPageType="edit" />
        <div className="container mx-auto px-5">
          <EventName register={register} errors={errors} />
          <Memo register={register} errors={errors} />
          <StartEndDatePicker control={control} errors={errors} />
          <MemberInEditMode
            control={control}
            register={register}
            errors={errors}
            unEditableMembers={unEditableMembers}
          />
          <MoneyUnit register={register} errors={errors} />
          <div className="text-center text-sm">
            <TermsLink inFooter={false} />
            に同意のうえ
          </div>
          <div className="flex flex-row w-full space-x-2 mt-2">
            <button
              type="button"
              className="btn w-1/2 no-animation"
              onClick={() => {
                push(`/event/${eventInfo.eventId}`);
              }}
            >
              キャンセル
            </button>
            <button
              type="submit"
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
