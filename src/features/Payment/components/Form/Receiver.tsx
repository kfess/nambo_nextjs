import React, { useState, useEffect } from "react";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { CreatePaymentType } from "@/features/Payment/paymentFormSchema";
import { EventType } from "@/features/Event/eventSchema";
import { ErrorMessage } from "@/components/shared/ErrorMessage";

type Props = {
  errors: FieldErrors<CreatePaymentType>;
  members: Pick<EventType, "members">["members"];
  setValue: UseFormSetValue<CreatePaymentType>;
};

export const Receiver: React.FC<Props> = ({ errors, members, setValue }) => {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>(
    members.reduce((acc, member) => ({ ...acc, [member.memberId]: false }), {})
  );

  const handleCheckboxChange = (memberId: string) => {
    setCheckedState((prev) => ({ ...prev, [memberId]: !prev[memberId] }));
  };

  useEffect(() => {
    const selectedPayees = members
      .filter((member) => checkedState[member.memberId])
      .map((member) => ({ id: member.memberId, name: member.name }));
    setValue("payees", selectedPayees);
  }, [checkedState, members, setValue]);

  const onSelectAll = () => {
    const newCheckedState = members.reduce(
      (acc, member) => ({ ...acc, [member.memberId]: true }),
      {}
    );
    setCheckedState(newCheckedState);
  };

  const onUnselectAll = () => {
    const newCheckedState = members.reduce(
      (acc, member) => ({ ...acc, [member.memberId]: false }),
      {}
    );
    setCheckedState(newCheckedState);
  };

  return (
    <div className="flex flex-col my-4 ">
      <div className="flex flex-row space-x-2 my-4">
        <label htmlFor="members" className="flex justify-between items-center">
          誰の分？*
        </label>
        <button
          type="button"
          onClick={onSelectAll}
          className="btn btn-sm rounded no-animation"
        >
          全員選択
        </button>
        <button
          type="button"
          onClick={onUnselectAll}
          className="btn btn-sm rounded no-animation"
        >
          全員未選択
        </button>
      </div>
      <div className="flex flex-row flex-wrap gap-x-2">
        {members.map((member) => (
          <label
            key={member.memberId}
            className="label cursor-pointer space-x-1"
          >
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(member.memberId)}
              checked={checkedState[member.memberId]}
              className="checkbox checkbox-primary checkbox-sm rounded no-animation"
            />
            <span className="label-text">{member.name}</span>
          </label>
        ))}
      </div>
      {errors.payees && <ErrorMessage message={errors.payees.message} />}
    </div>
  );
};
