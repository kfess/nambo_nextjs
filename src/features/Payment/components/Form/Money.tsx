import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CreatePaymentType } from "@/features/Payment/paymentFormSchema";
import { ErrorMessage } from "@/components/shared/ErrorMessage";

type Props = {
  register: UseFormRegister<CreatePaymentType>;
  errors: FieldErrors<CreatePaymentType>;
};

export const Money: React.FC<Props> = ({ register, errors }) => {
  return (
    <>
      <div className="flex flex-col mt-3">
        <label htmlFor="money" className="text-md mb-1 font-medium">
          なんぼ？*
        </label>
        <input
          {...register("cost", { valueAsNumber: true })}
          id="money"
          type="text"
          placeholder="1000"
          aria-label="金額"
          className="input input-bordered input-sm h-[2.5rem] w-full p-2 border rounded text-base mb-1"
        />
        {errors.cost && <ErrorMessage message={errors.cost.message} />}
      </div>
    </>
  );
};
