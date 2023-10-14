import React from "react";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <nav>Nambo.</nav>
      <main>{children}</main>
    </>
  );
};

export default Layout;
