import React from "react";
import { PaymentType } from "../paymentFormSchema";

type Props = {
  payment: PaymentType;
};

export const PaymentByEvent: React.FC<Props> = ({ payment }) => {
  return (
    <div className="flex p-2 rounded">
      <div className="flex-grow">
        <div className="flex flex-row justify-between mb-2">
          <div className="text-gray-500">{payment.purpose}</div>
          <div className="flex flex-row space-x-2">
            <button className="btn btn-sm rounded">編集</button>
            <button className="btn btn-outline btn-error btn-sm rounded">
              削除
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-between mb-2">
          <div className="font-bold text-xl">{payment.name}</div>
          <div className="font-bold text-xl">
            {payment.cost.toLocaleString()} 円
          </div>
        </div>
        <div>
          {payment.otherNames.map((otherName, index) => (
            <span
              key={index}
              className="badge badge-lg bg-nambo-green text-white mr-2"
            >
              {otherName}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
