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
import { Routes } from "router";

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

  React.useEffect(() => {
    setShowReset(params.reset === "true" ? true : false);
    setShowLogin(params.login === "true" ? true : false);
    setShowSignup(params.signup === "true" ? true : false);
    setShowRecovery(params.recovery === "true" ? true : false);
    setShowVerification(params.verification === "true" ? true : false);
  }, [params]);

  const openNav = () => setMobileNav(true);
  const closeNav = () => setMobileNav(false);

  const closeAuthModals = () => {
    navigate(pathname, { replace: true });
  };

  return (
    <>
      <LoginModal
        show={showLogin}
        closeModal={closeAuthModals}
        forgot={() => navigate(Routes.recovery)}
        signup={() => navigate(Routes.signup)}
      />
      <SignupModal
        show={showSignup}
        closeModal={closeAuthModals}
        login={() => navigate(Routes.login)}
        closeMobileNav={closeNav}
      />
      <ResetPasswordModal
        show={showReset}
        closeModal={closeAuthModals}
        login={() => navigate(Routes.login)}
      />
      <RecoveryModal
        show={showRecovery}
        closeModal={closeAuthModals}
        login={() => navigate(Routes.login)}
      />
      <VerificationModal
        show={showVerification}
        closeModal={closeAuthModals}
        signup={() => navigate(Routes.signup)}
        login={() => navigate(Routes.login)}
      />
      <Navbar
        active={active}
        login={() => {
          navigate(Routes.login);
          closeNav();
        }}
        signup={() => {
          navigate(Routes.signup);
          closeNav();
        }}
        closeNav={closeNav}
        openNav={openNav}
        showNav={mobileNav}
        auth={false}
      />
      <main className={`${styles.mainContent}`}>{children}</main>
      <Footer />
    </>
  );
};
export { Layout };
