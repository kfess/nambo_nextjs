import React from "react";
import { useRouter } from "next/router";
import { BiSolidUser } from "react-icons/bi";
import { BsListStars } from "react-icons/bs";
import { BiSolidCalendarStar } from "react-icons/bi";
import { TbMoneybag } from "react-icons/tb";
import { EventType } from "@/features/Event/eventSchema";
import { getColorClass } from "@/helpers/color";
import { formatDate } from "@/helpers/format";

type Props = {
  eventInfo: EventType;
};

export const Header: React.FC<Props> = ({ eventInfo }) => {
  const router = useRouter();

  return (
    <div className="bg-nambo-green pt-6 pb-6 px-4">
      <div className="container mx-auto bg-white px-7 py-4 rounded-xl">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <div className="flex flex-row items-center text-2xl mb-2 font-bold">
              <div>{eventInfo.eventName}</div>
            </div>
            <div className="flex flex-row items-center mb-1 pl-1">
              <BsListStars fontSize={20} className="text-gray-600" />
              <div className="text-sm pl-1">{eventInfo.memo}</div>
            </div>
            <div className="flex flex-row items-center mb-1  pl-1">
              <BiSolidCalendarStar fontSize={20} className="text-gray-600" />
              <div className="text-sm pl-1">
                {formatDate(eventInfo.fromDate)} ~{" "}
                {formatDate(eventInfo.toDate)}
              </div>
            </div>
            <div className="flex flex-wrap mb-1 pl-1">
              {eventInfo.members.map((member, idx) => (
                <div key={idx} className="flex flex-row items-center mr-1">
                  <BiSolidUser
                    fontSize={20}
                    className={getColorClass(member.name)}
                  />
                  <span className="text-sm pl-1">{member.name}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-row items-center pl-1">
              <TbMoneybag fontSize={20} className="text-gray-600" />
              <div className="text-sm pl-1 ">
                {eventInfo.moneyUnit} 円単位で精算
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              router.push(`/event/${eventInfo.eventId}/edit`);
            }}
            className="btn btn-sm mt-4 md:mt-0 no-animation"
          >
            イベント・メンバー編集
          </button>
        </div>
      </div>
    </div>
  );
};
