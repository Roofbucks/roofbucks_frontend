import { queryObject } from "helpers";
import {
  LoginModal,
  ResetPasswordModal,
  SignupModal,
  VerificationModal,
} from "pages";
import { RecoveryModal } from "pages/accountRecovery";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Footer } from "./footer";
import { Navbar, NavbarProps } from "./navbar";
import styles from "./styles.module.css";

export interface LayoutProps {
  children: any;
  active?: "home" | "listing" | "marketplace" | "agents" | "about" | "contact";
}

const Layout: React.FC<LayoutProps> = ({ children, active }) => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = React.useState(false);
  const [showSignup, setShowSignup] = React.useState(false);
  const [showReset, setShowReset] = React.useState(false);
  const [showRecovery, setShowRecovery] = React.useState(false);
  const [showVerification, setShowVerification] = React.useState(false);
  const [mobileNav, setMobileNav] = React.useState(false);

  const params = queryObject(search);
  console.log(params);
  React.useEffect(() => {
    setShowReset(params.reset === "true" ? true : false);
    setShowVerification(params.verification === "true" ? true : false);
  }, [params]);

  return (
    <>
      <LoginModal
        show={showLogin}
        closeModal={() => setShowLogin(false)}
        forgot={() => setShowRecovery(true)}
        signup={() => setShowSignup(true)}
      />
      <SignupModal
        show={showSignup}
        closeModal={() => setShowSignup(false)}
        login={() => setShowLogin(true)}
        closeMobileNav={() => setMobileNav(!mobileNav)}
      />
      <ResetPasswordModal
        show={showReset}
        closeModal={() => {
          setShowReset(false);
          navigate(pathname, { replace: true });
        }}
        login={() => setShowLogin(true)}
      />
      <RecoveryModal
        show={showRecovery}
        closeModal={() => {
          setShowRecovery(false);
          navigate(pathname, { replace: true });
        }}
        login={() => setShowLogin(true)}
      />
      <VerificationModal
        show={showVerification}
        closeModal={() => {
          setShowVerification(false);
          navigate(pathname, { replace: true });
        }}
        login={() => setShowLogin(true)}
      />
      <Navbar
        active={active}
        login={() => setShowLogin(true)}
        signup={() => setShowSignup(true)}
        closeMobileNav={mobileNav}
        auth={true}
      />
      <main className={`${styles.mainContent}`}>{children}</main>
      <Footer />
    </>
  );
};
export { Layout };
