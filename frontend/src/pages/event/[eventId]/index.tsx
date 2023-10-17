import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { EventType } from "../../../features/Event/eventSchema";
import { Header } from "../../../features/Payment/components/Header";
import { PaymentType } from "../../../features/Payment/paymentFormSchema";
import { PaymentByEvent } from "../../../features/Payment/components/PaymentByEvent";
import { WhoToWhom } from "../../../features/Payment/components/WhoToWhom";
import { TotalExpense } from "../../../features/Payment/components/TotalExpense";
import { Share } from "../../../features/Payment/components/Share";

export default function EventPage({
  event,
  payments,
}: InferGetServerSidePropsType<typeof getServerSideProps> & {
  event: EventType;
  payments: PaymentType[];
}) {
  const router = useRouter();
  const thisURL = `http://localhost:3000${router.asPath}`;

  // data fetched by getServerSideProps is stored in localStorage.
  // every Event Info throughout the app is get from localStorage.
  // Even if the data in localstorage is maliciously modified,
  // it will be overwritten by the data fetched by getServerSideProps. So it is not a problem.
  const [eventInfo, setEventInfo] = useState<EventType>(event);
  useEffect(() => {
    const storedEventInfo = localStorage.getItem(`eventInfo_${event.eventId}`);
    const storedData = storedEventInfo ? JSON.parse(storedEventInfo) : null;
    if (JSON.stringify(storedData) !== JSON.stringify(event)) {
      localStorage.setItem(`eventInfo_${event.eventId}`, JSON.stringify(event));
      setEventInfo(event);
    }
  }, [event]);

  // data fetched by getServerSideProps is stored in localStorage.
  // every Event Info throughout the app is get from localStorage.
  // Even if the data in localstorage is maliciously modified,
  // it will be overwritten by the data fetched by getServerSideProps. So it is not a problem.
  const [paymentInfo, setPaymentInfo] = useState<PaymentType[]>(payments);
  useEffect(() => {
    const storedPaymentInfo = localStorage.getItem(
      `paymentInfo_${event.eventId}`
    );
    const storedData = storedPaymentInfo ? JSON.parse(storedPaymentInfo) : null;
    if (JSON.stringify(storedData) !== JSON.stringify(payments)) {
      localStorage.setItem(
        `paymentInfo_${event.eventId}`,
        JSON.stringify(payments)
      );
      setPaymentInfo(payments);
    }
  }, [payments]);

  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <>
      <Header eventInfo={eventInfo} />
      <Share url={thisURL} />
      <div className="container mx-auto px-2 ">
        <button
          onClick={() => {
            router.push(`/payment/${eventInfo.eventId}/new`);
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
            {payments && eventInfo && (
              <WhoToWhom
                payments={paymentInfo}
                members={eventInfo.members}
                moneyUnit={eventInfo.moneyUnit}
              />
            )}
          </>
        )}
        {selectedTab === 1 && (
          <>
            {paymentInfo.map((payment) => (
              <div key={payment.paymentId}>
                <PaymentByEvent key={payment.paymentId} payment={payment} />
                <div className="divider" />
              </div>
            ))}
          </>
        )}
        {selectedTab === 2 && (
          <TotalExpense payments={paymentInfo} members={eventInfo.members} />
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const eventUrl = "http://localhost:3000/api/event";
  const eventData = await fetch(eventUrl).then((r) => r.json());

  const paymentUrl = "http://localhost:3000/api/payment";
  const paymentsData = await fetch(paymentUrl).then((r) => r.json());

  try {
    return {
      props: {
        event: eventData,
        payments: paymentsData,
      },
    };
  } catch (error) {}
};
