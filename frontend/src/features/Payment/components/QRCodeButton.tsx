import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ImQrcode } from "react-icons/im";

type Props = {
  url: string;
};

export const QRCodeButton: React.FC<Props> = ({ url }) => {
  const [qrCode, showQrcode] = useState(false);

  return (
    <div className="w-full">
      <button onClick={() => showQrcode(!qrCode)} className="btn w-full">
        QRコードを表示 <ImQrcode />
      </button>
      <div className="flex justify-center py-3 ">
        {qrCode && <QRCodeSVG value={url} />}
      </div>
    </div>
  );
};
