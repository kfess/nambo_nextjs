import { useRouter } from "next/router";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { EventType } from "../../../../features/Event/eventSchema";
import { Header } from "../../../../features/Payment/components/Header";
import {
  CreatePaymentType,
  createPaymentSchema,
} from "../../../../features/Payment/paymentFormSchema";
import { Purpose } from "../../../../features/Payment/components/Form/Purpose";
import { PayerName } from "../../../../features/Payment/components/Form/PayerName";
import { Receiver } from "../../../../features/Payment/components/Form/Receiver";
import { Money } from "../../../../features/Payment/components/Form/Money";

export default function PaymentNewPage() {
  const router = useRouter();
  const eventId = router.query.eventId as string;
  const [eventInfo] = useLocalStorage<EventType>(`eventInfo_${eventId}`);

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
      name: "",
      otherNames: [],
      cost: 0,
    },
    resolver: zodResolver(createPaymentSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
  });

  const payer = useWatch({
    control,
    name: "name",
  });

  if (!router.isReady || !eventInfo) {
    return null;
  }

  return (
    <div>
      <Header eventInfo={eventInfo} />
      <div className="container mx-auto px-5">
        <div className="text-center my-5 text-xl underline underline-offset-8 decoration-nambo-green decoration-4">
          支払い情報の追加
        </div>
        <Purpose control={control} errors={errors} />
        <PayerName
          control={control}
          errors={errors}
          payerCandidates={eventInfo.members ?? []}
        />
        <Receiver
          register={register}
          errors={errors}
          setValue={setValue}
          members={eventInfo.members ?? []}
        />
        <Money register={register} errors={errors} />
        <div className="flex flex-row w-full space-x-2 my-10">
          <button
            onClick={() => {
              router.push(`/event/${eventId}`);
            }}
            className="btn w-1/2"
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
