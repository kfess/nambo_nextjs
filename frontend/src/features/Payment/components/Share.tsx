import React from "react";
import { FiUpload } from "react-icons/fi";
import { URLCopyButton } from "./URLCopyButton";
import { QRCodeButton } from "./QRCodeButton";
import { LINEShareButton } from "./LINEShareButton";

type Props = {
  url: string;
};

export const Share: React.FC<Props> = ({ url }) => {
  const onClick = () => {
    const dialog = document.getElementById("my_modal_1") as HTMLDialogElement;
    dialog && dialog.showModal();
  };

  return (
    <div className="p-2">
      <div className="text-right">
        <button className="btn btn-sm" onClick={onClick}>
          <span>URL を共有</span>
          <FiUpload />
        </button>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">URL を共有</h3>
          <div className="w-full flex flex-col items-center space-y-2">
            <URLCopyButton url={url} />
            <QRCodeButton url={url} />
            <LINEShareButton url={url} />
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm">キャンセル</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
