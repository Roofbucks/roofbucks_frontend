import * as React from "react";
import { Footer } from "../footer";
import { Navbar } from "../navbar";
import styles from "./styles.module.css";

export interface UnAuthLayoutProps {
  children: any;
}

const UnAuthLayout: React.FC<UnAuthLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className={`appContainer ${styles.mainContent}`}>{children}</main>
      <Footer />
    </>
  );
};
export { UnAuthLayout };
