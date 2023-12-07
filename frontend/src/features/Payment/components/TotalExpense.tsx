import React, { useState } from "react";
import { PaymentType } from "@/features/Payment/paymentFormSchema";
import { Member } from "@/features/Event/eventSchema";
import { calcExpenseByTotalAction } from "@/features/Payment/calcPayments";

type Props = {
  payments: PaymentType[];
  members: Member[];
};

export const TotalExpense: React.FC<Props> = ({ payments, members }) => {
  const uniqueNames = Array.from(members.map((member) => member.name));
  const payerCost = payments.reduce((prev, cur) => {
    prev = uniqueNames.reduce((acc, name) => {
      const x = cur.name === name ? cur.cost : 0;
      const y = prev[name] ?? 0;
      acc[name] = x + y;
      return acc;
    }, {} as { [name: string]: number });
    return prev;
  }, {} as { [name: string]: number });

  const totalCost = uniqueNames.reduce((prev, name) => {
    prev += payerCost[name];
    return prev;
  }, 0);

  const [includeRatio, setIncludeRatio] = useState(true);

  return (
    <>
      <div className="form-control w-32">
        <label className="cursor-pointer label">
          <span className="label-text">傾斜計算</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={includeRatio}
            onChange={() => setIncludeRatio(!includeRatio)}
          />
        </label>
      </div>
      <table className="table table-zebra text-center">
        <thead className="border-b-2 border-b-gray-200">
          <tr>
            <th>メンバー</th>
            <th>個人の支出</th>
            <th>支払い・受取り</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => {
            return (
              <tr key={member.name}>
                <td>{member.name}</td>
                <td>
                  {Number(
                    calcExpenseByTotalAction(payments, members, includeRatio)[
                      member.name
                    ].toFixed(1)
                  ).toLocaleString()}{" "}
                  円
                </td>
                <td>
                  {payerCost[member.name] -
                    Math.floor(
                      calcExpenseByTotalAction(payments, members, includeRatio)[
                        member.name
                      ]
                    ) >
                    0 && (
                    <div className="text-green-700">
                      +
                      {(
                        payerCost[member.name] -
                        Math.floor(
                          calcExpenseByTotalAction(
                            payments,
                            members,
                            includeRatio
                          )[member.name]
                        )
                      ).toLocaleString()}{" "}
                      円
                    </div>
                  )}
                  {payerCost[member.name] -
                    Math.floor(
                      calcExpenseByTotalAction(payments, members, includeRatio)[
                        member.name
                      ]
                    ) <
                    0 && (
                    <div className="text-red-600">
                      {(
                        payerCost[member.name] -
                        Math.floor(
                          calcExpenseByTotalAction(
                            payments,
                            members,
                            includeRatio
                          )[member.name]
                        )
                      ).toLocaleString()}{" "}
                      円
                    </div>
                  )}
                  {payerCost[member.name] -
                    Math.floor(
                      calcExpenseByTotalAction(payments, members, includeRatio)[
                        member.name
                      ]
                    ) ===
                    0 && (
                    <div>
                      {(
                        payerCost[member.name] -
                        Math.floor(
                          calcExpenseByTotalAction(
                            payments,
                            members,
                            includeRatio
                          )[member.name]
                        )
                      ).toLocaleString()}{" "}
                      円
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
          <tr className="border-t-4 border-double border-t-gray-300">
            <td>合計</td>
            <td>{totalCost.toLocaleString()} 円</td>
            <td>0 円</td>
          </tr>
        </tbody>
      </table>
      <div className="text-right text-sm mt-2">
        <div className="text-gray-500">
          <span className="text-green-700">緑字</span>: 受取るお金の総額
        </div>
        <div className="text-gray-500">
          <span className="text-red-600">赤字</span>: 支払うお金の総額
        </div>
      </div>
    </>
  );
};
