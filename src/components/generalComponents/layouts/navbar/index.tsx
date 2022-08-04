import { MenuClose, MenuOpen } from "assets";
import { Button, LogoWithText } from "components/generalComponents";
import * as React from "react";
import { Link } from "react-router-dom";
import { Routes } from "router";
import styles from "./styles.module.css";

export interface NavbarProps {
  active?: "listing" | "marketplace" | "agents" | "about" | "contact";
}

const Navbar: React.FC<NavbarProps> = ({ active }) => {
  const [showNav, setShowNav] = React.useState(false);
  const [mobile, setMobile] = React.useState(
    window.innerWidth <= 800 ? true : false
  );

  const screenSizeUpdate = () => {
    if (window.innerWidth <= 900) {
      setMobile(true);
    } else if (window.innerWidth > 900) {
      setMobile(false);
      setShowNav(false)
    }
  };
  window.onresize = screenSizeUpdate;

  return (
    <nav className={styles.navBg}>
      <div
        className={`appContainer ${styles.nav} ${
          showNav ? styles.openNav : ""
        }`}
      >
        {(!showNav && mobile) || !mobile ? (
          <Link
            className={styles.logo}
            style={{ textDecoration: "none" }}
            to={Routes.home}
          >
            <LogoWithText type="dark" />
          </Link>
        ) : (
          ""
        )}
        {showNav ? (
          <MenuClose
            className={styles.closeMenu}
            role={"button"}
            onClick={() => setShowNav(false)}
          />
        ) : (
          <MenuOpen
            className={styles.openMenu}
            role={"button"}
            onClick={() => setShowNav(true)}
          />
        )}
        {(mobile && showNav) || !mobile ? (
          <>
            <div className={styles.navItems}>
              <Link
                className={active === "listing" ? styles.activeItem : ""}
                to={Routes.listing}
              >
                Listing
              </Link>
              <Link
                className={active === "marketplace" ? styles.activeItem : ""}
                to={Routes.marketplace}
              >
                Market Place
              </Link>
              <Link
                className={active === "agents" ? styles.activeItem : ""}
                to={Routes.agents}
              >
                Agent List
              </Link>
              <Link
                className={active === "about" ? styles.activeItem : ""}
                to={Routes.about}
              >
                About{" "}
              </Link>
              <Link
                className={active === "contact" ? styles.activeItem : ""}
                to={Routes.contact}
              >
                Contact{" "}
              </Link>
            </div>
            <div className={styles.btnWrap}>
              <Button
                className={styles.loginBtn}
                onClick={() => {}}
                type="tertiary"
              >
                Login
              </Button>
              <Button onClick={() => {}} type="primary">
                Sign Up
              </Button>
            </div>
          </>
        ) : (
          ""
        )}
        {mobile && showNav ? (
          <div className={styles.copyright}>
            <small>
              © Roofbucks {new Date().getFullYear()}. All Rights Reserved
            </small>
          </div>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};
export { Navbar };
