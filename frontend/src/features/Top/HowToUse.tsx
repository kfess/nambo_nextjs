import Image from "next/image";
import Chip from "../../components/shared/Chip";

const messages = [
  "イベントを作成します。",
  "メンバーに URL を共有します。",
  "支払い情報を入力するだけ！",
];

export const HowToUse = () => {
  return (
    <div>
      <h5 className="text-center pb-5 text-xl">使い方は簡単</h5>
      <div>
        <span className="badge bg-green-600 text-white px-3 py-5 ">Step1</span>
        <div className="pl-5 py-1">イベントを作成します</div>
        <div className="">
          <Image
            src="/how_to_use_1.png"
            alt="create event"
            width={300}
            height={150}
          />
        </div>

        {/* <img
          src={howToUse1}
          alt="picture"
          style={{
            display: "block",
            width: "50%",
            maxWidth: "400px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        /> */}
      </div>
      {/* <div style={{ marginBottom: "40px" }}>
        <h3>
          <Badge pill={true} color="success">
            Step 2
          </Badge>
        </h3>
        <div style={{ marginLeft: "20px", marginBottom: "15px" }}>
          {messages[1]}
        </div>
        <img
          src={howToUse2}
          alt="picture"
          style={{
            display: "block",
            width: "50%",
            maxWidth: "400px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      </div>
      <div style={{ marginBottom: "40px" }}>
        <h3>
          <Badge pill={true} color="success">
            Step 3
          </Badge>
        </h3>
        <div style={{ marginLeft: "20px", marginBottom: "15px" }}>
          {messages[2]}
        </div>
        <img
          src={howToUse3}
          alt="picture"
          style={{
            display: "block",
            width: "50%",
            maxWidth: "400px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      </div> */}
    </div>
  );
};
