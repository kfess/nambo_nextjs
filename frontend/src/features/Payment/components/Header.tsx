import React from "react";
import { useRouter } from "next/router";
import { BiSolidUser } from "react-icons/bi";
import { BsListStars, BsBookmarkStarFill } from "react-icons/bs";
import { BiSolidCalendarStar } from "react-icons/bi";
import { TbMoneybag } from "react-icons/tb";
import { EventType } from "../../Event/newFormSchema";

type Props = {
  eventInfo: EventType;
};

export const Header: React.FC<Props> = ({ eventInfo }) => {
  const router = useRouter();

  return (
    <div className="bg-nambo-green text-white p-5">
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <div className="flex flex-row items-center text-2xl space-x-1">
            <BsBookmarkStarFill fontSize={20} />
            <div className="pl-1">{eventInfo.eventName}</div>
          </div>
          <div className="flex flex-row items-center space-x-1 my-1">
            <BsListStars fontSize={20} />
            <div className="pl-1">{eventInfo.memo}</div>
          </div>
          <div className="flex flex-row items-center space-x-1 my-1">
            <BiSolidCalendarStar fontSize={20} />
            <div className="pl-1">
              {eventInfo.fromDate} ~ {eventInfo.toDate}
            </div>
          </div>
          <div className="flex flex-wrap my-1">
            {eventInfo.members.map((member) => (
              <div
                key={member.name}
                className="flex flex-row items-center mr-1"
              >
                <BiSolidUser fontSize={20} />
                <span className="pl-1">{member.name}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-row items-center space-x-1 my-1">
            <TbMoneybag fontSize={20} />
            <div>{eventInfo.moneyUnit} 円単位で精算</div>
          </div>
        </div>
        <button
          onClick={() => {
            router.push(`/event/${eventInfo.eventId}/edit`);
          }}
          className="btn btn-sm mt-4 md:mt-0"
        >
          イベント・メンバー編集
        </button>
      </div>
    </div>
  );
};
