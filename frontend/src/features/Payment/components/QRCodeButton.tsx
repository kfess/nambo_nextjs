import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ImQrcode } from "react-icons/im";

interface Props {
  url: string;
}

export const QRCodeButton = (props: Props) => {
  const { url } = props;
  const [qrCode, showQrcode] = useState(false);

  return (
    <div className="w-full">
      <button onClick={() => showQrcode(!qrCode)} className="btn w-full">
        QRコードを表示 <ImQrcode />
      </button>
      <div>{qrCode && <QRCodeSVG value={url} />}</div>
    </div>
  );
};
