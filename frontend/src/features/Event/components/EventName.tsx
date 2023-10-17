import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateEventType } from "../eventSchema";
import { ErrorMessage } from "../../../components/shared/ErrorMessage";

type Props = {
  register: UseFormRegister<CreateEventType>;
  errors: FieldErrors<CreateEventType>;
};

export const EventName: React.FC<Props> = ({ register, errors }) => {
  return (
    <div className="my-4">
      <fieldset className="flex flex-col">
        <legend className="text-md font-bold mb-1">イベント名 *</legend>
        <input
          {...register("eventName")}
          id="event-name"
          type="text"
          placeholder="花火大会 など"
          aria-label="イベント名 (花火大会など)"
          className="input input-bordered input-sm h-[2.5rem] w-full p-2 border rounded text-base mb-1"
        />
        {errors.eventName && (
          <ErrorMessage message={errors.eventName.message} />
        )}
      </fieldset>
    </div>
  );
};
