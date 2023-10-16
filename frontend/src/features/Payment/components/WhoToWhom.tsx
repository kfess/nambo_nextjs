import React from "react";
import { FaMoneyBill } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";
import { RiMoneyCnyCircleLine } from "react-icons/ri";
import { RxDoubleArrowRight } from "react-icons/rx";
import { Member, MoneyUnit } from "../../Event/eventSchema";
import { PaymentType } from "../paymentFormSchema";
import {
  calcPayBackMoney,
  calcPaymentByTotalAction,
  PayBackMoney,
} from "../calcPayments";

type Props = {
  payments: PaymentType[];
  members: Member[];
  moneyUnit: MoneyUnit;
};

export const WhoToWhom: React.FC<Props> = ({
  payments,
  members,
  moneyUnit,
}) => {
  const data = calcPayBackMoney(calcPaymentByTotalAction(payments, members));
  const groupedData: Record<string, PayBackMoney[]> = data.reduce(
    (acc, curr) => {
      if (!acc[curr.fromName]) {
        acc[curr.fromName] = [];
      }
      acc[curr.fromName] = [...acc[curr.fromName], curr];
      return acc;
    },
    {}
  );

  return (
    <div>
      {Object.entries(groupedData).map(([fromName, paybacks], idx) => {
        const sum = paybacks.reduce((acc, curr) => acc + curr.cost, 0);
        return (
          <div
            key={idx}
            className="my-3 px-4 py-3 shadow-md rounded-lg border border-l-8 border-l-pink-800"
          >
            <div className="text-xs text-gray-400">DAREGA</div>
            <div className="flex flex-row justify-between">
              <div className="text-2xl font-bold text-pink-800 mb-3">
                {fromName}
              </div>
              <div>
                {sum <= 1000 ? (
                  <RiMoneyCnyCircleLine
                    fontSize={30}
                    className="text-gray-600"
                  />
                ) : sum <= 10000 ? (
                  <FaMoneyBill fontSize={30} className="text-gray-600" />
                ) : (
                  <FaMoneyBills fontSize={30} className="text-gray-600" />
                )}
              </div>
            </div>
            <div className="flex flex-row justify-between text-xs text-gray-400">
              <div>DARENI</div>
              <div>NAMBO</div>
            </div>

            {paybacks.map((payback, idx) => (
              <div
                key={idx}
                className="flex justify-between mb-3 border-b font-bold"
              >
                <span>{payback.toName}</span>
                <span className="font-bold text-xl text-pink-800">
                  {(
                    Math.floor(payback.cost / parseInt(moneyUnit, 10)) *
                    parseInt(moneyUnit, 10)
                  ).toLocaleString()}{" "}
                  円
                </span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
