import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { CreateEventType } from "../eventSchema";
import { ErrorMessage } from "../../../components/shared/ErrorMessage";

type Props = {
  control: Control<CreateEventType>;
  errors: FieldErrors<CreateEventType>;
};

export const MoneyUnit: React.FC<Props> = ({ control, errors }) => {
  return (
    <div className="mb-4">
      <Controller
        name="moneyUnit"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col mt-3">
            <label htmlFor="money-unit" className="text-md mb-1 font-medium">
              精算単位*
            </label>
            <select
              {...field}
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
          </div>
        )}
      />
    </div>
  );
};
