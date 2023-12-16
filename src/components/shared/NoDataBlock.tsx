import React from "react";
import { FaBoxOpen } from "react-icons/fa";

type Props = {
  readonly message: string;
};

export const NoDataBlock: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="text-6xl text-gray-500 mx-4">
        <FaBoxOpen />
      </div>
      <div className="text-gray-500 text-center">{message}</div>
    </div>
  );
};
