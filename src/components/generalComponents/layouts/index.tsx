import { LoginModal, SignupModal } from "pages";
import * as React from "react";
import { Footer } from "./footer";
import { Navbar, NavbarProps } from "./navbar";
import styles from "./styles.module.css";

export interface LayoutProps {
  children: any;
  active?: "home" | "listing" | "marketplace" | "agents" | "about" | "contact";
}

const Layout: React.FC<LayoutProps> = ({ children, active }) => {
  const [showLogin, setShowLogin] = React.useState(false);
  const [showSignup, setShowSignup] = React.useState(false);
  return (
    <>
      <LoginModal show={showLogin} closeModal={() => setShowLogin(false)} />
      <SignupModal show={showSignup} closeModal={() => setShowSignup(false)} />
      <Navbar
        active={active}
        login={() => setShowLogin(true)}
        signup={() => setShowSignup(true)}
      />
      <main className={`${styles.mainContent}`}>{children}</main>
      <Footer />
    </>
  );
};
export { Layout };
