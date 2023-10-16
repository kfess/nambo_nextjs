import React from "react";
import { BiSolidUser } from "react-icons/bi";
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
        <div className="flex flex-row flex-wrap">
          {payment.otherNames.map((otherName, index) => (
            <span key={index} className="flex flex-row items-center mr-2">
              <BiSolidUser fontSize={20} />
              <div>{otherName}</div>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

{
  /* <div className="flex flex-wrap mb-1 pl-1">
                  {eventInfo.members.map((member, idx) => (
                    <div key={idx} className="flex flex-row items-center mr-1">
                      <BiSolidUser
                        fontSize={20}
                        className={`text-${
                          userColors[idx % eventInfo.members.length]
                        }-300`}
                      />
                      <span className="text-sm pl-1">{member.name}</span>
                    </div>
                  ))}
                </div> */
}
