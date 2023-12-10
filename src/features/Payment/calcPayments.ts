import { Member } from "../Event/eventSchema";
import { PaymentType } from "./paymentFormSchema";

const calcTotalRatio = (members: Member[], considerRatio: boolean = true) =>
  members.reduce((sum, member) => sum + (considerRatio ? member.ratio : 1), 0);

/** 一つの行動単位 (旅行代, 電車代, 宿泊費など) に対する金額計算 */
export const calcPaymentByAction = (
  member: Member,
  otherMember: Member[],
  cost: number
) => {
  const myCost = { [member.name]: cost };

  const otherMemberCost = otherMember.reduce(
    (prev, member) => {
      const totalRatio = calcTotalRatio(otherMember);
      prev[member.name] = (-1 * member.ratio * cost) / totalRatio;
      return prev;
    },
    {} as { [name: string]: number }
  );

  const uniqueNameKeys = Array.from(
    new Set<string>(Object.keys(myCost).concat(Object.keys(otherMemberCost)))
  );

  const totalCost = uniqueNameKeys.reduce(
    (acc, value) => {
      const x = myCost[value] ?? 0;
      const y = otherMemberCost[value] ?? 0;
      acc[value] = x + y;
      return acc;
    },
    {} as { [name: string]: number }
  );

  return totalCost;
};

/** 全ての行動単位を合算した金額計算 */
export const calcPaymentByTotalAction = (
  data: PaymentType[],
  members: Member[]
) => {
  const uniqueNames = Array.from(members.map((member) => member.name));

  const totalCost = data.reduce(
    (prev, cur) => {
      /** 支払い者 */
      const myName = members.find((member) => member.name === cur.payer.name);
      /**支払われた側 */
      const otherNames = members.filter((member) =>
        cur.payees.some((payee) => payee.name === member.name)
      );

      const costByAction = calcPaymentByAction(
        myName as Member,
        otherNames,
        cur.cost
      );

      prev = uniqueNames.reduce(
        (acc, name) => {
          const x = costByAction[name] ?? 0;
          const y = prev[name] ?? 0;
          acc[name] = x + y;
          return acc;
        },
        {} as { [name: string]: number }
      );

      return prev;
    },
    {} as { [name: string]: number }
  );

  return totalCost;
};

export interface PayBackMoney {
  fromName: string;
  toName: string;
  cost: number;
}

const MAX_ITER_CNT = 1000;

export const calcPayBackMoney = (data: {
  [name: string]: number;
}): PayBackMoney[] => {
  const sortedArr = Object.keys(data)
    .map((key) => {
      return { name: key, cost: data[key] };
    })
    .map((obj) => Object.assign({}, obj));

  let payBackArray: PayBackMoney[] = [];
  let iterCnt = 0;

  while (true) {
    sortedArr.sort((a, b) => {
      return a.cost < b.cost ? -1 : 1;
    });
    const [lender, borrower] = [sortedArr.slice(-1)[0], sortedArr[0]];

    const money = Math.min(Math.abs(lender.cost), Math.abs(borrower.cost));
    if (Math.abs(lender.cost) <= 0.001 && Math.abs(borrower.cost) <= 0.001) {
      return payBackArray;
    }

    if (iterCnt > MAX_ITER_CNT) {
      return [] as PayBackMoney[];
    }

    sortedArr[0].cost += money;
    sortedArr[sortedArr.length - 1].cost -= money;

    iterCnt += 1;

    payBackArray = [
      ...payBackArray,
      { fromName: borrower.name, toName: lender.name, cost: money },
    ];
  }
};

/** 1つのイベントごとに、各人が支払うべき金額 */
export const calcExpenseByAction = (
  otherMember: Member[],
  cost: number,
  calcRatio: boolean = true
) => {
  const otherMemberCost = otherMember.reduce(
    (prev, member) => {
      const totalRatio = calcTotalRatio(otherMember, calcRatio);
      prev[member.name] = ((calcRatio ? member.ratio : 1) * cost) / totalRatio;
      return prev;
    },
    {} as { [name: string]: number }
  );

  return otherMemberCost;
};

export const calcExpenseByTotalAction = (
  data: PaymentType[],
  members: Member[],
  calcRatio: boolean = true
) => {
  const uniqueNames = Array.from(members.map((member) => member.name));

  const totalCost = data.reduce(
    (prev, cur) => {
      /**支払われた側 */
      const otherNames = members.filter((member) =>
        cur.payees.some((payee) => payee.name === member.name)
      );

      const costByAction = calcExpenseByAction(
        otherNames,
        cur.cost,
        (calcRatio = calcRatio)
      );

      prev = uniqueNames.reduce(
        (acc, name) => {
          const x = costByAction[name] ?? 0;
          const y = prev[name] ?? 0;
          acc[name] = x + y;
          return acc;
        },
        {} as { [name: string]: number }
      );

      return prev;
    },
    {} as { [name: string]: number }
  );

  return totalCost;
};
