import React from "react";
import { Member, MoneyUnit } from "../../Event/eventSchema";
import { PaymentType } from "../paymentFormSchema";
import { calcPayBackMoney, calcPaymentByTotalAction } from "../calcPayments";

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

  //   console.log(data);

  return (
    <>
      {data
        .sort((a, b) => (a.fromName < b.fromName ? -1 : 1))
        .filter((d) => {
          return Math.floor(d.cost / parseInt(moneyUnit, 10)) > 0;
        })
        .map((d, idx) => {
          return (
            <div key={idx}>
              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ padding: 5 }}>
                    <div className="payment-page__from-name-tag">
                      {d.fromName}
                    </div>
                  </div>
                  <div style={{ padding: 0 }}>
                    <div className="payment-page__pentagon-arrow">
                      {(
                        Math.floor(d.cost / parseInt(moneyUnit, 10)) *
                        parseInt(moneyUnit, 10)
                      ).toLocaleString()}{" "}
                      円
                    </div>
                  </div>
                  <div style={{ padding: 5 }}>
                    <div className="payment-page__from-name-tag">
                      {d.toName}
                    </div>
                  </div>
                </div>
              </div>
              <div className="payment-page__border-line"></div>
            </div>
          );
        })}
    </>
  );
};
