import React, { useState } from "react";
import {
  useFieldArray,
  Control,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { CreateEventType } from "../eventSchema";
import { ErrorMessage } from "../../../components/shared/ErrorMessage";

type Props = {
  control: Control<CreateEventType>;
  register: UseFormRegister<CreateEventType>;
  errors: FieldErrors<CreateEventType>;
};

export const Member: React.FC<Props> = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const onClickAddMember = () => {
    append({ name: "", ratio: 1 });
  };

  const onClickRemoveMember = (index: number) => {
    remove(index);
  };

  const [showToolTip, setShowTooltip] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full">
        <div className="flex flex-row space-x-2">
          <label
            htmlFor="members"
            className="flex justify-between items-center font-bold"
          >
            メンバー名*
          </label>
          <span>
            <button
              type="button"
              onClick={onClickAddMember}
              className="btn btn-sm bg-primary hover:bg-primary-hover text-white rounded"
            >
              ＋
            </button>
          </span>
        </div>
        <div className="pl-2">
          <label htmlFor="members">傾斜配分</label>
          <div className="tooltip tooltip-top">
            <button
              className="btn btn-circle btn-sm"
              {...(showToolTip
                ? {
                    "data-tip":
                      "傾斜配分とは： 割り当てる金額の割合(比率)を指定します。Aさん「1」, Bさん「2」 Aさん:Bさん=1:2",
                  }
                : {})}
              onMouseEnter={(event) => {
                event.preventDefault();
                setShowTooltip(true);
              }}
            >
              ?
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        {fields.map((field, index) => (
          <li
            key={field.id}
            className="list-none flex flex-row w-full py-1 space-x-2"
          >
            <div className="flex-grow">
              <input
                {...register(`members.${index}.name`)}
                placeholder={`ユーザー名`}
                type="text"
                className={`input input-bordered p-2 ${
                  errors.members?.[field.id]?.name ? "border-red-500" : ""
                } rounded h-[2.5rem] w-full`}
              />
              {errors.members?.[field.id]?.name?.message && (
                <ErrorMessage
                  message={errors.members?.[field.id]?.name?.message}
                />
              )}
            </div>
            <div className="flex-grow">
              <input
                {...register(`members.${index}.ratio`)}
                placeholder="傾斜配分"
                type="number"
                className={`input input-bordered p-2 ${
                  errors.members?.[field.id]?.ratio ? "border-red-500" : ""
                } rounded h-[2.5rem] w-full`}
              />
              <div className="text-red-500 text-sm">
                {errors.members?.[field.id]?.ratio?.message && (
                  <ErrorMessage
                    message={errors.members?.[field.id]?.ratio?.message}
                  />
                )}
              </div>
            </div>
            <div className="flex-grow-0">
              <button
                type="button"
                onClick={() => onClickRemoveMember(index)}
                className="btn rounded"
              >
                ー
              </button>
            </div>
          </li>
        ))}
        {errors.members?.root && (
          <ErrorMessage message={errors.members?.root?.message} />
        )}
      </div>
    </div>
  );
};
