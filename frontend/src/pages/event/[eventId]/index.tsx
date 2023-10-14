import { useState } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { EventType } from "../../../features/Event/eventSchema";
import { Header } from "../../../features/Payment/components/Header";
import { Share } from "../../../features/Payment/components/Share";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export default function EventPage({
  res,
}: InferGetServerSidePropsType<typeof getServerSideProps> & {
  res: EventType;
}) {
  const router = useRouter();
  const thisURL = `http://localhost:3000${router.pathname}`;

  // data fetched by getServerSideProps is stored in localStorage.
  // every Event Info throughout the app is get from localStorage.
  // Even if the data in localstorage is maliciously modified,
  // it will be overwritten by the data fetched by getServerSideProps. So it is not a problem.
  const [eventInfo] = useLocalStorage(
    `eventInfo_${res.eventId}`, // key (UUID), which is considered to be unique for each event.
    res
  );

  const [selectedTab, setSelectedTab] = useState(0);

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
            これまでの支払い情報
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
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const url = "http://localhost:3000/api/event";
  const res = await fetch(url).then((r) => r.json());

  try {
    return {
      props: { res },
    };
  } catch (error) {}
};
