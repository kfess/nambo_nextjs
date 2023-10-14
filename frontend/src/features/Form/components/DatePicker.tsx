import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreateNewEventFormSchemaType } from "../newFormSchema";
import { ErrorMessage } from "../../../components/shared/ErrorMessage";

type Props = {
  control: Control<CreateNewEventFormSchemaType>;
  errors: FieldErrors<CreateNewEventFormSchemaType>;
};

export const StartEndDatePicker: React.FC<Props> = ({ control, errors }) => {
  return (
    <>
      <div className="mb-4 flex flex-row w-full space-x-1">
        <Controller
          name="fromDate"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col mt-3 w-1/2">
              <label htmlFor="from-date" className="text-md mb-1 font-medium">
                いつから？
              </label>
              <DatePicker
                {...field}
                id="from-date"
                selected={new Date(field.value)}
                onChange={(date) => field.onChange(date)}
                dateFormat="yyyy/MM/dd"
                className="input input-bordered input-sm h-[2.5rem] w-full p-2 border rounded text-base mb-1"
              />
              {errors.fromDate && (
                <ErrorMessage message={errors.fromDate.message} />
              )}
            </div>
          )}
        />
        <Controller
          name="toDate"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col mt-3 w-1/2">
              <label htmlFor="from-date" className="text-md mb-1 font-medium">
                いつまで？
              </label>
              <DatePicker
                {...field}
                id="from-date"
                selected={new Date(field.value)}
                onChange={(date) => field.onChange(date)}
                dateFormat="yyyy/MM/dd"
                className="input input-bordered input-sm h-[2.5rem] w-full p-2 border rounded text-base mb-1"
              />
              {errors.toDate && (
                <ErrorMessage message={errors.toDate.message} />
              )}
            </div>
          )}
        />
      </div>
    </>
  );
};
