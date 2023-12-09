import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventType } from "@/features/Event/eventSchema";
import { Header } from "@/features/Payment/components/Header";
import {
  CreatePaymentType,
  createPaymentSchema,
} from "@/features/Payment/paymentFormSchema";
import { Purpose } from "@/features/Payment/components/Form/Purpose";
import { PayerName } from "@/features/Payment/components/Form/PayerName";
import { Receiver } from "@/features/Payment/components/Form/Receiver";
import { Money } from "@/features/Payment/components/Form/Money";
import { InferGetServerSidePropsType } from "next";

export default function PaymentNewPage({
  event,
}: InferGetServerSidePropsType<typeof getServerSideProps> & {
  event: EventType;
}) {
  const router = useRouter();
  const eventId = event.eventId;

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<CreatePaymentType>({
    defaultValues: {
      eventId: eventId,
      purpose: "",
      payer: "",
      payees: [],
      cost: 0,
    },
    resolver: zodResolver(createPaymentSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
  });

  if (!router.isReady || !event) {
    return null;
  }

  return (
    <div>
      <Header eventInfo={event} />
      <div className="container mx-auto px-5">
        <div className="text-center my-5 text-xl underline underline-offset-8 decoration-nambo-green decoration-4">
          支払い情報の追加
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
            追加
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const { eventId } = context.params;
  const eventUrl = `http://localhost:3000/api/event?eventId=${eventId}`;
  const eventData = (await fetch(eventUrl).then((res) =>
    res.json()
  )) as EventType;

  try {
    return { props: { event: eventData } };
  } catch (error) {
    return { props: { event: null } };
  }
};
