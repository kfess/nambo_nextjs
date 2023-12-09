import { useEffect } from "react";
import { useRouter } from "next/router";
import type { InferGetServerSidePropsType } from "next";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventType } from "@/features/Event/eventSchema";
import { PaymentType } from "@/features/Payment/paymentFormSchema";
import { Header } from "@/features/Payment/components/Header";
import {
  UpdatePaymentType,
  updatePaymentSchema,
} from "@/features/Payment/paymentFormSchema";
import { Purpose } from "@/features/Payment/components/Form/Purpose";
import { PayerName } from "@/features/Payment/components/Form/PayerName";
import { Receiver } from "@/features/Payment/components/Form/Receiver";
import { Money } from "@/features/Payment/components/Form/Money";

export default function EditPaymentPage({
  event,
  payment,
}: InferGetServerSidePropsType<typeof getServerSideProps> & {
  event: EventType;
  payment: PaymentType;
}) {
  const router = useRouter();
  const eventId = event.eventId;
  const paymentId = payment.paymentId;

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<UpdatePaymentType>({
    defaultValues: {
      eventId: eventId,
      purpose: payment.purpose || "",
      payer: payment.payer || "",
      payees: payment.payees || [],
      cost: payment.cost || 0,
    },
    resolver: zodResolver(updatePaymentSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
  });

  useEffect(() => {
    if (payment) {
      setValue("purpose", payment.purpose);
      setValue("payer", payment.payer);
      setValue("payees", payment.payees);
      setValue("cost", payment.cost);
    }
  }, [event, payment, setValue]);

  return (
    <div>
      <Header eventInfo={event} />
      <div className="container mx-auto px-5">
        <div className="text-center my-5 text-xl underline underline-offset-8 decoration-nambo-green decoration-4">
          支払い情報の更新
        </div>
        <Purpose control={control} errors={errors} />
        <PayerName
          control={control}
          errors={errors}
          payerCandidates={event.members ?? []}
        />
        <Receiver
          register={register}
          errors={errors}
          setValue={setValue}
          members={event.members ?? []}
        />
        <Money register={register} errors={errors} />
        <div className="flex flex-row w-full space-x-2 my-10">
          <button
            onClick={() => {
              router.push(`/event/${eventId}`);
            }}
            className="btn w-1/2 no-animation"
          >
            キャンセル
          </button>
          <button
            onClick={() => {
              router.push(`/event/${eventId}`);
            }}
            className="btn bg-primary hover:bg-primary-hover text-white w-1/2 no-animation"
          >
            更新
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const { eventId, paymentId } = context.params;

  const eventUrl = `http://localhost:3000/api/event?eventId=${eventId}`;
  const eventData = (await fetch(eventUrl).then((res) =>
    res.json()
  )) as EventType;

  const paymentUrl = "http://localhost:3000/api/payment";
  const paymentData = (await fetch(paymentUrl).then((res) =>
    res.json()
  )) as PaymentType;

  try {
    return { props: { event: eventData, payment: paymentData } };
  } catch (error) {
    return { props: { event: null, payment: null } };
  }
};
