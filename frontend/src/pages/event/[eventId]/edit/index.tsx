import React from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TermsLink } from "../../../../features/Terms/components/TermsLink";
import { Header } from "../../../../features/Event/components/Header";
import {
  createEventSchema,
  CreateEventType,
} from "../../../../features/Event/newFormSchema";
import { EventName } from "../../../../features/Event/components/EventName";
import { Memo } from "../../../../features/Event/components/Memo";
import { StartEndDatePicker } from "../../../../features/Event/components/DatePicker";
import { Member } from "../../../../features/Event/components/Member";
import { MoneyUnit } from "../../../../features/Event/components/MoneyUnit";

export default function EditEventPage() {
  const {
    control,
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
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
  });
  return <div>a</div>;
}
