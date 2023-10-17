import React from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TermsLink } from "../../features/Terms/components/TermsLink";
import { Header } from "../../features/Event/components/Header";
import {
  createEventSchema,
  CreateEventType,
} from "../../features/Event/eventSchema";
import { EventName } from "../../features/Event/components/EventName";
import { Memo } from "../../features/Event/components/Memo";
import { StartEndDatePicker } from "../../features/Event/components/DatePicker";
import { Member } from "../../features/Event/components/Member";
import { MoneyUnit } from "../../features/Event/components/MoneyUnit";

export default function NewEventPage() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateEventType>({
    defaultValues: {
      eventName: "",
      memo: "",
      fromDate: dayjs().format("YYYY/MM/DD"),
      toDate: dayjs().format("YYYY/MM/DD"),
      members: [
        { name: "", ratio: 1 },
        { name: "", ratio: 1 },
      ],
      moneyUnit: "100",
    },
    resolver: zodResolver(createEventSchema),
    mode: "onSubmit",
    criteriaMode: "all",
  });

  const { push } = useRouter();

  const onSubmit: SubmitHandler<CreateEventType> = async (
    data: CreateEventType
  ) => {
    // await postEventData(
    //   `${process.env.REACT_APP_DB_EVENT_BASE_URL}/create/`,
    //   data
    // );
    console.log(data);
    push("/event/1");
  };

  console.log(errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header formPageType="new" />
        <div className="container mx-auto px-5">
          <EventName register={register} errors={errors} />
          <Memo register={register} errors={errors} />
          <StartEndDatePicker control={control} errors={errors} />
          <Member register={register} control={control} errors={errors} />
          <MoneyUnit register={register} errors={errors} />
          <div className="text-center text-sm">
            <TermsLink inFooter={false} />
            に同意のうえ
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn bg-primary hover:bg-primary-hover text-white w-full mt-1 no-animation"
          >
            イベント作成
          </button>
        </div>
      </form>
    </div>
  );
}
