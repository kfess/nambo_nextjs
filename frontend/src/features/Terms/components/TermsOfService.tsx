import React from "react";

export const TermsOfService = () => {
  return (
    <main className="text-neutral-700 mt-5 mb-14">
      <h1 className="font-bold mb-5 text-2xl">利用規約</h1>

      <section className="my-5">
        <h2 className="font-bold text-xl">第１条（規約の適用）</h2>
        <ol className="list-decimal list-inside">
          <li>
            本規約は、本ウェブサイトで提供するサービスの利用条件を定めるものです。
          </li>
          <li>
            本サービスを利用する者は、本規約に同意したものとみなされます。
          </li>
          <li>本規約は、本サービスの提供終了まで有効です。</li>
        </ol>
      </section>

      <section className="my-5">
        <h2 className="font-bold text-xl">第２条（サービス内容）</h2>
        <ol className="list-decimal list-inside">
          <li>本サービスの利用時間は、全日、1日24時間です。</li>
          <li>
            本サービスは、利用者に対して完全な無欠性を保証するものではありません。
          </li>
        </ol>
      </section>

      <section className="my-5">
        <h2 className="font-bold text-xl">第３条（著作権）</h2>
        <ul className="list-disc list-inside">
          <li>
            本サービスで使用される文章、画像、プログラム等の著作権は、本サービスまたは権利者に帰属します。
          </li>
        </ul>
      </section>

      <section className="my-5">
        <h2 className="font-bold text-xl">第４条（利用者の義務）</h2>
        <ul className="list-disc list-inside">
          <li>
            利用者は、以下の行為をしてはなりません。
            <ol className="list-decimal list-inside ml-5">
              <li>
                他の利用者、第三者、または本サービス運営者の権利を侵害する行為。
              </li>
              <li>本サービスの運営を妨害する行為。</li>
              <li>ウイルス等の有害なプログラムを使用または配布する行為。</li>
              <li>法令に違反する行為。</li>
              <li>その他、本サービス運営者が不適切と判断する行為。</li>
            </ol>
          </li>
        </ul>
      </section>

      <section className="my-5">
        <h2 className="font-bold text-xl">第５条（免責事項）</h2>
        <ol className="list-decimal list-inside">
          <li>
            本サービス運営者は、本サービスの運営に最大限の注意を払いますが、その内容の正確性、完全性、安全性、有用性等について保証するものではありません。
          </li>
          <li>
            利用者が本サービスを利用した結果生じた損害について、一切の責任を負いません。
          </li>
        </ol>
      </section>

      <section className="my-5">
        <h2 className="font-bold text-xl">第６条（規約の改定）</h2>
        <ul className="list-disc list-inside">
          <li>
            本サービス運営者は、利用者の承諾を得ることなく本規約を変更することができます。
          </li>
          <li>
            規約の改定は、本ウェブサイト上での掲載をもって通知されたものとします。
          </li>
        </ul>
      </section>

      <section className="my-5">
        <h2 className="font-bold text-xl">第７条（準拠法および管轄裁判所）</h2>
        <ol className="list-decimal list-inside">
          <li>本規約の解釈にあたっては、日本国法を準拠法とします。</li>
          <li>
            本規約に起因する紛争については、東京地方裁判所を専属的合意管轄裁判所とします。
          </li>
        </ol>
      </section>
    </main>
  );
};
