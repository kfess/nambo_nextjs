import Image from "next/image";
import Chip from "../../components/shared/Chip";

const messages = [
  "イベントを作成します。",
  "メンバーに URL を共有します。",
  "支払い情報を入力するだけ！",
];

export const HowToUse = () => {
  return (
    <>
      <h5 style={{ textAlign: "center", marginTop: "1rem" }}>使い方は簡単</h5>
      <div style={{ marginBottom: "40px" }}>
        <h3>
          <Chip label="Step 1" />
        </h3>
        <div style={{ marginLeft: "20px", marginBottom: "15px" }}>
          {messages[0]}
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
    </>
  );
};
