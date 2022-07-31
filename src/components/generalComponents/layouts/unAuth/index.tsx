import * as React from "react";
import { Footer } from "../footer";
import { Navbar, NavbarProps } from "../navbar";
import styles from "./styles.module.css";

export interface UnAuthLayoutProps extends NavbarProps {
  children: any;
}

const UnAuthLayout: React.FC<UnAuthLayoutProps> = ({ children, active }) => {
  return (
    <>
      <Navbar active={active} />
      <main className={`${styles.mainContent}`}>{children}</main>
      <Footer />
    </>
  );
};
export { UnAuthLayout };
