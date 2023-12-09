import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import type { InferGetServerSidePropsType } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TermsLink } from "@/features/Terms/components/TermsLink";
import { Header } from "@/features/Event/components/Header";
import {
  EventType,
  EditEventType,
  generateEditEventSchema,
} from "@/features/Event/eventSchema";
import { EventName } from "@/features/Event/components/EventName";
import { Memo } from "@/features/Event/components/Memo";
import { StartEndDatePicker } from "@/features/Event/components/DatePicker";
import { MoneyUnit } from "@/features/Event/components/MoneyUnit";
import { PaymentType } from "@/features/Payment/paymentFormSchema";
import { MemberInEditMode } from "@/features/Event/components/MemberInEditMode";

export default function EditEventPage({
  event,
  payments,
}: InferGetServerSidePropsType<typeof getServerSideProps> & {
  event: EventType;
  payments: PaymentType[];
}) {
  const router = useRouter();
  const eventId = event.eventId;

  const unEditableMembers = Array.from(
    (payments ?? []).reduce((set, payment) => {
      set.add(payment.payer);
      payment.payees.forEach((payee) => set.add(payee));
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
  } = useForm<EditEventType>({
    defaultValues: {
      eventId: event.eventId,
      eventName: event.eventName,
      memo: event.memo,
      fromDate: event.fromDate ?? dayjs().format("YYYY-MM-DD"),
      toDate: event.toDate ?? dayjs().format("YYYY-MM-DD"),
      members: event.members,
      moneyUnit: event.moneyUnit,
    },
    resolver: zodResolver(editEventSchema),
    mode: "onSubmit",
    criteriaMode: "all",
  });

  const { push } = useRouter();

  const onSubmit: SubmitHandler<EventType> = async (data: EventType) => {
    console.log(data);
    push(`/event/${eventId}`);
  };

  useEffect(() => {
    if (event && payments) {
      setValue("eventName", event.eventName);
      setValue("memo", event.memo);
      setValue("fromDate", event.fromDate);
      setValue("toDate", event.toDate);
      setValue("members", event.members);
      setValue("moneyUnit", event.moneyUnit);
    }
  }, [event, payments, setValue]);

  if (!router.isReady || !event || !payments) {
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
                push(`/event/${event.eventId}`);
              }}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="btn w-1/2 bg-primary hover:bg-primary-hover text-white no-animation"
              onClick={() => {
                push(`/event/${event.eventId}`);
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

export const getServerSideProps = async (context: any) => {
  const { eventId, paymentId } = context.params;

  const eventUrl = `http://localhost:3000/api/event?eventId=${eventId}`;
  const eventData = (await fetch(eventUrl).then((res) =>
    res.json()
  )) as EventType;

  const paymentUrl = `http://localhost:3000/api/payment?paymentId=${paymentId}`;
  const paymentsData = (await fetch(paymentUrl).then((res) =>
    res.json()
  )) as PaymentType[];

  try {
    return { props: { event: eventData, payments: paymentsData } };
  } catch (error) {
    return { props: { event: null, payments: null } };
  }
};
