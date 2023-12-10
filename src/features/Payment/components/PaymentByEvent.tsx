import React from "react";
import { useRouter } from "next/router";
import { BiSolidUser } from "react-icons/bi";
import { PaymentType } from "@/features/Payment/paymentFormSchema";
import { getColorClass } from "@/helpers/color";

type Props = {
  payment: PaymentType;
};

export const PaymentByEvent: React.FC<Props> = ({ payment }) => {
  const router = useRouter();
  const { eventId } = router.query;

  return (
    <div className="flex px-2 py-1 rounded">
      <div className="flex-grow">
        <div className="flex flex-row justify-between mb-2">
          <div className="text-gray-500">{payment.purpose}</div>
          <div className="flex flex-row space-x-2">
            <button
              onClick={() => {
                router.push(
                  `/payment/${eventId}/edit?paymentId=${payment.paymentId}`
                );
              }}
              className="btn btn-sm rounded no-animation"
            >
              編集
            </button>
            <button className="btn btn-outline btn-error btn-sm rounded no-animation">
              削除
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-between mb-1">
          <div className="font-bold text-xl">{payment.payer.name}</div>
          <div className="font-bold text-xl">
            {payment.cost.toLocaleString()} 円
          </div>
        </div>
        <div className="flex flex-row flex-wrap">
          {payment.payees.map((payee, index) => (
            <span key={index} className="flex flex-row items-center mr-2">
              <BiSolidUser
                fontSize={20}
                className={getColorClass(payee.name)}
              />
              <div>{payee.name}</div>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
