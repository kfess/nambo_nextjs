import React, { useState } from "react";
import {
  useFieldArray,
  Controller,
  Control,
  FieldErrors,
} from "react-hook-form";
import { CreateNewEventFormSchemaType } from "../newFormSchema";
import { ErrorMessage } from "../../../components/shared/ErrorMessage";

type Props = {
  control: Control<CreateNewEventFormSchemaType>;
  errors: FieldErrors<CreateNewEventFormSchemaType>;
};

export const Member: React.FC<Props> = ({ control, errors }) => {
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
            className="flex justify-between items-center"
          >
            メンバー名*
          </label>
          <span>
            <button
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
              <Controller
                control={control}
                name={`members.${index}.name`}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder={`ユーザー名`}
                    type="text"
                    className={`input input-bordered p-2 ${
                      errors.members?.[index] || errors.members
                        ? "border-red-500"
                        : ""
                    } rounded h-[2.5rem] w-full`}
                  />
                )}
              />
              <div className="text-red-500 text-sm">
                {errors.members?.[index]?.name?.message &&
                  errors.members?.[index]?.name?.message}
              </div>
            </div>
            <div className="flex-grow">
              <Controller
                control={control}
                name={`members.${index}.ratio`}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="傾斜配分"
                    type="number"
                    className={`input input-bordered p-2 ${
                      errors.members?.[index] ? "border-red-500" : ""
                    } rounded h-[2.5rem] w-full`}
                  />
                )}
              />
              <div className="text-red-500 text-sm">
                {errors.members?.[index]?.ratio?.message && (
                  <ErrorMessage
                    message={errors.members?.[index]?.ratio?.message}
                  />
                )}
              </div>
            </div>
            <div className="flex-grow-0 h-[2.5rem]">
              <button
                onClick={() => onClickRemoveMember(index)}
                className="btn rounded"
              >
                ー
              </button>
            </div>
          </li>
        ))}
        <div className="text-red-500 text-sm p-2">
          {/* <ErrorMessage
            errors={errors}
            name="members"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            }
          /> */}
        </div>
      </div>
    </div>
  );
};
