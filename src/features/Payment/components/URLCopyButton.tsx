import React, { useState } from "react";
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
  const [isCopySuccess, setIsCopySuccess] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => {
          copyTextToClipBoard(url);
          setIsCopySuccess(true);
        }}
        className="btn w-full"
      >
        {isCopySuccess ? (
          <span>URLをコピーしました！</span>
        ) : (
          <div className="flex flex-row space-x-2">
            <span>URL をコピー</span>
            <MdOutlineFileCopy />
          </div>
        )}
      </button>
    </div>
  );
};
