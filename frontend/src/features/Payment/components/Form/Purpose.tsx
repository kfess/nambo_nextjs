import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { CreatePaymentType } from "../../paymentFormSchema";
import { ErrorMessage } from "../../../../components/shared/ErrorMessage";

type Props = {
  control: Control<CreatePaymentType>;
  errors: FieldErrors<CreatePaymentType>;
};

export const Purpose: React.FC<Props> = ({ control, errors }) => {
  return (
    <Controller
      name="purpose"
      control={control}
      render={({ field }) => (
        <div className="flex flex-col mt-3">
          <label htmlFor="purpose" className="text-md mb-1 font-medium">
            何の代金？*
          </label>
          <input
            {...field}
            placeholder="お菓子代"
            id="purpose"
            type="text"
            className="input input-bordered input-sm h-[2.5rem] w-full p-2 border rounded text-base mb-1"
          />
          {errors.purpose && <ErrorMessage message={errors.purpose.message} />}
        </div>
      )}
    />
  );
};
