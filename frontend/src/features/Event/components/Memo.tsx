import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "../../../components/shared/ErrorMessage";
import { CreateNewEventFormSchemaType } from "../newFormSchema";

type Props = {
  control: Control<CreateNewEventFormSchemaType>;
  errors: FieldErrors<CreateNewEventFormSchemaType>;
};

export const Memo: React.FC<Props> = ({ control, errors }) => {
  return (
    <Controller
      name="memo"
      control={control}
      render={({ field }) => (
        <div className="flex flex-col mt-3">
          <label htmlFor="event-name" className="text-md mb-1 font-medium">
            メモ
          </label>
          <textarea
            {...field}
            placeholder="○月○日までに入力してね！ など"
            aria-label="memo (○月○日までに入力してね！など)"
            className="textarea textarea-bordered h-20 w-full p-2 border rounded text-base mb-1"
          />
          {errors.memo && <ErrorMessage message={errors.memo.message} />}
        </div>
      )}
    />
  );
};
