import React from "react";
import { MdOutlineFileCopy } from "react-icons/md";

const copyTextToClipBoard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => console.log("Copied to ClipBoard Successfully!"))
    .catch((error) => console.log("Failed to copy the text: ", error));
};

type Props = {
  url: string;
};

export const URLCopyButton: React.FC<Props> = ({ url }) => {
  return (
    <div className="w-full">
      <button onClick={() => copyTextToClipBoard(url)} className="btn w-full">
        <span>URLをコピー</span>
        <MdOutlineFileCopy />
      </button>
      {/* <Tooltip
        target="url-copy-button"
        children={<div>URLをコピーしました。</div>}
        trigger="focus"
      /> */}
    </div>
  );
};
