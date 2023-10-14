import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TermsLink } from "../../features/Terms/components/TermsLink";
import { Header } from "../../features/Form/components/Header";
import {
  createNewEventFormSchema,
  CreateNewEventFormSchemaType,
} from "../../features/Form/newFormSchema";
import { EventName } from "../../features/Form/components/EventName";
import { Memo } from "../../features/Form/components/Memo";

export default function NewPage() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateNewEventFormSchemaType>({
    defaultValues: {
      eventName: "",
      memo: "",
      fromDate: "",
      toDate: "",
      members: [
        { name: "", ratio: 1 },
        { name: "", ratio: 1 },
      ],
      moneyUnit: "100",
    },
    resolver: zodResolver(createNewEventFormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
  });

  return (
    <div>
      <form>
        <Header formPageType="new" />
        <div className="container mx-auto px-5">
          <EventName control={control} errors={errors} />
          <Memo control={control} errors={errors} />
          <div className="text-center text-sm">
            <TermsLink inFooter={false} />
            に同意のうえ
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn bg-primary hover:bg-primary-hover text-white w-full mt-1"
          >
            イベント作成
          </button>
        </div>
      </form>
    </div>
  );
}
