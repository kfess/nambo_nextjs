import React, { useState } from "react";

type FAQType = { Q: string; A: string };

const FAQList: FAQType[] = [
  {
    Q: "Q. nambo. とは何ですか？",
    A: "A. nambo.は、立て替え情報を入力することで、最適な精算方法(お金のやり取り)を提案してくれるウェブサービスです。",
  },
  {
    Q: "Q. アプリのインストールは必要ですか？",
    A: "A. nambo.を利用するにあたって、アプリのインストールは不要です。ウェブブラウザからご利用いただけます。",
  },
  {
    Q: "Q. 会員登録は必要ですか？",
    A: "A. nambo.は会員登録不要です。誰でもすぐに利用することができます。",
  },
  {
    Q: "Q. 料金はかかりますか？",
    A: "A. nambo.は無料のウェブサービスです。利用するにあたって料金はかかりません。",
  },
  {
    Q: "Q. 傾斜配分とは何ですか？",
    A: "A. 傾斜配分の機能は、料金を(均等な配分ではなく)ある割合で割り当てることを設定する機能です。",
  },
  {
    Q: "Q. 精算単位とは何ですか？",
    A: "A. 精算単位は、精算する(お金のやり取りをする)単位を10円単位または100円単位のように、細かく精算するか、または大まかに精算するかを決めるものです。",
  },
  {
    Q: "Q. 作成したイベントの精算ページは誰でも見ることができますか？",
    A: "A. URLを共有している人であれば、誰でも見ることができます。",
  },
];

export const FAQ = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="join join-vertical w-full">
      <div>よくある質問</div>
      {FAQList.map((faq, index) => {
        return (
          <div
            key={index}
            className="collapse collapse-arrow join-item border border-base-300"
          >
            <input
              type="radio"
              name="my-accordion-4"
              checked={active === index}
              onChange={() => setActive(index)}
            />
            <div className="collapse-title font-bold">{faq.Q}</div>
            <div className="collapse-content">
              <p>{faq.A}</p>
            </div>
          </div>
        );
      })}
      {/* <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" checked="checked" />
        <div className="collapse-title text-xl font-medium">
          Click to open this one and close others
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-xl font-medium">
          Click to open this one and close others
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-xl font-medium">
          Click to open this one and close others
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div> */}
    </div>
  );
};
