import React from "react";
import Link from "next/link";

type Props = {
  showMessage: boolean;
};

export const CreateEventBlock: React.FC<Props> = ({ showMessage }) => {
  return (
    <>
      {showMessage && (
        <h5 className="text-center py-5 text-xl">
          支払い情報を整理して最適な精算を提案
        </h5>
      )}
      <Link href="/new">
        <button className="btn w-full bg-primary text-white text-xl font-medium">
          さっそく始める
        </button>
      </Link>
    </>
  );
};
