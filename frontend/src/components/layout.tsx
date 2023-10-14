import Image from "next/image";
import React from "react";
import { MdOutlineCopyright } from "react-icons/md";

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
      <main className="min-h-screen">{children}</main>
      <footer className="footer mt-10 p-10 bg-neutral text-neutral-content">
        <nav>
          <a className="link link-hover text-white">利用規約</a>
          <a className="link link-hover text-white">お問い合わせ</a>
          <div className="text-white flex flex-row items-center">
            <MdOutlineCopyright />
            <span>&nbsp;nambo.</span>
          </div>
        </nav>
      </footer>
    </>
  );
};

export default Layout;
