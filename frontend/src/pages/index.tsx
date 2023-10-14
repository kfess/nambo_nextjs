import React from "react";
import { About } from "../features/Top/About";
import { Feature } from "../features/Top/Feature";
import { HowToUse } from "../features/Top/HowToUse";
import { FAQ } from "../features/Top/FAQ";

export default function TopPage() {
  return (
    <>
      <About />
      <HowToUse />
      <Feature />
      <FAQ />
    </>
  );
}
