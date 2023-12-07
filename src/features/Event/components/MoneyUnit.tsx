import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateEventType } from "@/features/Event/eventSchema";
import { ErrorMessage } from "@/components/shared/ErrorMessage";

type Props = {
  register: UseFormRegister<CreateEventType>;
  errors: FieldErrors<CreateEventType>;
};

export const MoneyUnit: React.FC<Props> = ({ register, errors }) => {
  return (
    <div className="my-4">
      <fieldset className="flex flex-col mt-3">
        <legend className="text-md mb-1 font-bold">精算単位*</legend>
        <select
          {...register("moneyUnit")}
          id="money-unit"
          aria-label="精算単位"
          defaultValue={10}
          className="select select-bordered select-md text-base w-full"
        >
          <option value="1">1 円単位</option>
          <option value="10">10 円単位</option>
          <option value="100">100 円単位</option>
          <option value="1000">1000 円単位</option>
        </select>
        {errors.moneyUnit && (
          <ErrorMessage message={errors.moneyUnit.message} />
        )}
      </fieldset>
    </div>
  );
};
