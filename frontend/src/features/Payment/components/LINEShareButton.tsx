import React from "react";
import { LineIcon, LineShareButton } from "react-share";

interface Props {
  url: string;
}

export const LINEShareButton: React.FC<Props> = ({ url }) => {
  return (
    <>
      <div className="w-full">
        <LineShareButton url={url} className="btn w-full">
          <span>LINE でシェア</span> <LineIcon size="25" round />
        </LineShareButton>
      </div>
    </>
  );
};
