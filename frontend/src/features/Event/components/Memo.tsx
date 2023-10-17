import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "../../../components/shared/ErrorMessage";
import { CreateEventType } from "../eventSchema";

type Props = {
  register: UseFormRegister<CreateEventType>;
  errors: FieldErrors<CreateEventType>;
};

export const Memo: React.FC<Props> = ({ register, errors }) => {
  return (
    <div className="my-4">
      <fieldset className="flex flex-col">
        <legend className="text-md font-bold mb-1 ">メモ</legend>
        <textarea
          {...register("memo")}
          placeholder="○月○日までに入力してね！ など"
          aria-label="memo (○月○日までに入力してね！など)"
          className="textarea textarea-bordered text-base h-20 w-full p-2 border rounded max-h-52"
        />
        {errors.memo && <ErrorMessage message={errors.memo.message} />}
      </fieldset>
    </div>
  );
};
