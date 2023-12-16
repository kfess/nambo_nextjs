import { ZodError } from "zod";
import { AxiosError } from "axios";
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
import { fetchEvent } from "@/features/Event/api/fetchEvent";
import { fetchPayments } from "@/features/Payment/api/fetchPayments";
import { ERROR_MESSAGES, UnknownError } from "@/helpers/error";
import { NoDataBlock } from "@/components/shared/NoDataBlock";

export default function EventPage({
  event,
  payments,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps> & {
  event: EventType;
  payments: PaymentType[];
  error: string;
}) {
  if (error) {
    return <div>{error}</div>;
  }

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
            {payments.length === 0 && (
              <NoDataBlock message="支払い情報がありません。" />
            )}
          </>
        )}
        {selectedTab === 1 && (
          <>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <div key={payment.paymentId}>
                  <PaymentByEvent key={payment.paymentId} payment={payment} />
                  <div className="divider" />
                </div>
              ))
            ) : (
              <NoDataBlock message="支払い情報がありません。" />
            )}
          </>
        )}
        {selectedTab === 2 && (
          <>
            {payments.length > 0 ? (
              <TotalExpense payments={payments} members={event.members} />
            ) : (
              <NoDataBlock message="支払い情報がありません。" />
            )}
          </>
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { eventId } = context.params;
  try {
    const [event, payments] = await Promise.all([
      fetchEvent(eventId), // イベント情報の取得
      fetchPayments(eventId), // 支払い情報の取得
    ]);
    return { props: { event, payments } };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const statusCode = error.response?.status;
      if (!statusCode) {
        throw new UnknownError();
      }
      switch (statusCode) {
        case 400:
          return { props: { error: ERROR_MESSAGES["400"] } };
        case 404:
          return { notFound: true };
        case 500:
          throw new Error(ERROR_MESSAGES["500"]);
        default:
          return { props: { error: ERROR_MESSAGES.UNKNOWN_ERROR } };
      }
    } else if (error instanceof ZodError) {
      return { props: { error: ERROR_MESSAGES.VALIDATION_ERROR } };
    }
    throw new UnknownError();
  }
};
