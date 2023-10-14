import React from "react";
import { About } from "../features/Top/About";
import { Feature } from "../features/Top/Feature";
import { HowToUse } from "../features/Top/HowToUse";
import { FAQ } from "../features/Top/FAQ";
import { CreateEventBlock } from "../features/Top/CreateEventBlock";

export default function TopPage() {
  return (
    <div>
      <About />
      <div className="container mx-auto px-5">
        <CreateEventBlock showMessage={true} />
        <div className="divider" />
        <HowToUse />
        <Feature />
        <FAQ />
      </div>
    </div>
  );
}
