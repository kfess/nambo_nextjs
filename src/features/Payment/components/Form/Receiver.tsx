import React from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { CreatePaymentType } from "@/features/Payment/paymentFormSchema";
import { EventType } from "@/features/Event/eventSchema";
import { ErrorMessage } from "@/components/shared/ErrorMessage";

type Props = {
  register: UseFormRegister<CreatePaymentType>;
  errors: FieldErrors<CreatePaymentType>;
  members: Pick<EventType, "members">["members"];
  setValue: UseFormSetValue<CreatePaymentType>;
};

export const Receiver: React.FC<Props> = ({
  register,
  errors,
  members,
  setValue,
}) => {
  const onSelectAll = () => {
    setValue(
      "otherNames",
      members.map((member) => member.name)
    );
  };

  const onUnselectAll = () => {
    setValue("otherNames", []);
  };

  return (
    <div className="flex flex-col my-4 ">
      <div className="flex flex-row space-x-2 my-4">
        <label htmlFor="members" className="flex justify-between items-center">
          誰の分？*
        </label>
        <button
          type="button"
          onClick={onSelectAll}
          className="btn btn-sm rounded no-animation"
        >
          全員選択
        </button>
        <button
          type="button"
          onClick={onUnselectAll}
          className="btn btn-sm rounded no-animation"
        >
          全員未選択
        </button>
      </div>
      <div className="flex flex-row flex-wrap gap-x-2">
        {members.map((member) => {
          return (
            <label key={member.name} className="label cursor-pointer space-x-1">
              <input
                type="checkbox"
                {...register("otherNames")}
                value={member.name}
                className="checkbox checkbox-primary checkbox-sm rounded no-animation"
              />
              <span className="label-text" />
              {member.name}
            </label>
          );
        })}
      </div>
      {errors.otherNames && (
        <ErrorMessage message={errors.otherNames.message} />
      )}
    </div>
  );
};
