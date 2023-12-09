import { useState } from "react";
import { useRouter } from "next/router";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { EventType } from "@/features/Event/eventSchema";
import { Header } from "@/features/Payment/components/Header";
import { PaymentType } from "@/features/Payment/paymentFormSchema";
import { PaymentByEvent } from "@/features/Payment/components/PaymentByEvent";
import { WhoToWhom } from "@/features/Payment/components/WhoToWhom";
import { TotalExpense } from "@/features/Payment/components/TotalExpense";
import { Share } from "@/features/Payment/components/Share";

export default function EventPage({
  event,
  payments,
}: InferGetServerSidePropsType<typeof getServerSideProps> & {
  event: EventType;
  payments: PaymentType[];
}) {
  const router = useRouter();
  const thisURL = `http://localhost:3000${router.asPath}`;

  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <>
      <Header eventInfo={event} />
      <Share url={thisURL} />
      <div className="container mx-auto px-2 ">
        <button
          onClick={() => {
            router.push(`/payment/${event.eventId}/new`);
          }}
          className="btn w-full bg-primary hover:bg-primary-hover text-white my-3"
        >
          支払い情報入力へ
        </button>
        <div className="tabs tabs-boxed my-2 flex">
          <div
            className={`tab flex-1 ${selectedTab === 0 ? "tab-active" : ""}`}
            onClick={() => {
              setSelectedTab(0);
            }}
          >
            誰が誰になんぼ？
          </div>
          <div
            className={`tab flex-1 ${selectedTab === 1 ? "tab-active" : ""}`}
            onClick={() => {
              setSelectedTab(1);
            }}
          >
            支払い情報
          </div>
          <div
            className={`tab flex-1 ${selectedTab === 2 ? "tab-active" : ""}`}
            onClick={() => {
              setSelectedTab(2);
            }}
          >
            みんなの支出
          </div>
        </div>
        {selectedTab === 0 && (
          <>
            {payments && event && (
              <WhoToWhom
                payments={payments}
                members={event.members}
                moneyUnit={event.moneyUnit}
              />
            )}
          </>
        )}
        {selectedTab === 1 && (
          <>
            {payments.map((payment) => (
              <div key={payment.paymentId}>
                <PaymentByEvent key={payment.paymentId} payment={payment} />
                <div className="divider" />
              </div>
            ))}
          </>
        )}
        {selectedTab === 2 && (
          <TotalExpense payments={payments} members={event.members} />
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const eventUrl = `http://localhost:3000/api/event?eventId=${context.params?.eventId}`;
  const eventData = (await fetch(eventUrl).then((r) => r.json())) as EventType;

  const paymentUrl = "http://localhost:3000/api/payment";
  const paymentsData = (await fetch(paymentUrl).then((r) =>
    r.json()
  )) as PaymentType[];

  try {
    return {
      props: {
        event: eventData,
        payments: paymentsData,
      },
    };
  } catch (error) {}
};
