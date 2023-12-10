import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import { CreatePaymentType } from "@/features/Payment/paymentFormSchema";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { EventType } from "@/features/Event/eventSchema";

type Props = {
  control: Control<CreatePaymentType>;
  errors: FieldErrors<CreatePaymentType>;
  setValue: UseFormSetValue<CreatePaymentType>;
  payerCandidates: Pick<EventType, "members">["members"];
};

export const PayerName: React.FC<Props> = ({
  control,
  errors,
  setValue,
  payerCandidates,
}) => {
  return (
    <div className="mb-4">
      <Controller
        name="payer.name"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col mt-3">
            <label htmlFor="purpose" className="text-md mb-1 font-medium">
              誰が支払った？*
            </label>
            <select
              {...field}
              id="name"
              aria-label="支払った人"
              className="select select-bordered select-md text-base w-full"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const selectedName = e.target.value;
                const selectedMember = payerCandidates.find(
                  (m) => m.name === selectedName
                );
                if (selectedMember) {
                  setValue("payer.id", selectedMember.memberId);
                }
                field.onChange(e);
              }}
            >
              <option value="">--</option>
              {payerCandidates.map((member, idx) => (
                <option key={idx} value={member.name}>
                  {member.name}
                </option>
              ))}
            </select>
            {errors.payer && <ErrorMessage message={errors.payer.message} />}
          </div>
        )}
      />
    </div>
  );
};
