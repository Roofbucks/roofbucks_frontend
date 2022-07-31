import { Button, LogoWithText } from "components/generalComponents";
import * as React from "react";
import { Link } from "react-router-dom";
import { Routes } from "router";
import styles from "./styles.module.css";

export interface NavbarProps {
  active?: "listing" | "marketplace" | "agents" | "about" | "contact";
}

const Navbar: React.FC<NavbarProps> = ({ active }) => {
  return (
    <nav className={styles.navBg}>
      <div className={`appContainer ${styles.nav}`}>
        <Link style={{ textDecoration: "none" }} to={Routes.home}>
          <LogoWithText type="dark" />
        </Link>
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
      </div>
    </nav>
  );
};
export { Navbar };
