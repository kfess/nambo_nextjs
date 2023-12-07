import React from "react";

type Props = {
  formPageType: "new" | "edit";
};

export const Header: React.FC<Props> = ({ formPageType }) => {
  const message =
    formPageType === "new" ? "新規イベント作成" : "イベント・メンバー編集";
  return (
    <h5 className="text-center py-3 text-xl bg-nambo-green text-white">
      {message}
    </h5>
  );
};
