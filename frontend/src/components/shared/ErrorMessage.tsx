import React from "react";

type Props = {
  readonly message: string | undefined | null;
};

export const ErrorMessage: React.FC<Props> = ({ message }) => {
  return message ? <div className="text-red-500 text-sm">{message}</div> : null;
};
