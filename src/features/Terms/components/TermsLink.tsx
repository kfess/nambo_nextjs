import React from "react";

type Props = {
  inFooter: boolean;
};

export const TermsLink: React.FC<Props> = ({ inFooter }) => {
  const color = inFooter ? "text-white" : "text-black";
  return (
    <div>
      <a
        href="/terms"
        target="_blank"
        rel="noopener noreferrer"
        className={`${color} underline`}
      >
        利用規約
      </a>
    </div>
  );
};
