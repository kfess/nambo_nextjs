import Image from "next/image";

export const Feature = () => {
  return (
    <section>
      <h2>nambo. の特徴</h2>
      <ul>
        <li>
          <h3>アプリのインストール不要</h3>
          <Image
            src="/no-download.png"
            alt="No download required"
            width={250}
            height={250}
          />
        </li>
        <li>
          <h3>URLで簡単共有！</h3>
          <Image
            src="/url-share.png"
            alt="URL share"
            width={250}
            height={250}
          />
        </li>
        <li>
          <h3>簡単ワリカン精算</h3>
          <Image
            src="/payment.png"
            alt="Easy payment"
            width={250}
            height={250}
          />
        </li>
        <li>
          <h3>傾斜配分で割合調整も可能！</h3>
          <Image
            src="/ratio.png"
            alt="Ratio adjustment"
            width={250}
            height={250}
          />
        </li>
      </ul>
    </section>
  );
};
