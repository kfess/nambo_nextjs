import Image from "next/image";
import React from "react";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost normal-case text-xl">
            <Image
              src="/nambo_logo.png"
              alt="nambo logo"
              width="50"
              height="25.91"
            />
            nambo.
          </a>
        </div>
      </div>
      <main>{children}</main>
    </>
  );
};

export default Layout;
