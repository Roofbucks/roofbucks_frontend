import { Button, LogoWithText } from "components/generalComponents";
import * as React from "react";
import { Link } from "react-router-dom";
import { Routes } from "router";
import styles from "./styles.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navBg}>
      <div className={`appContainer ${styles.nav}`}>
        <Link style={{ textDecoration: "none" }} to={Routes.home}>
          <LogoWithText type="dark" />
        </Link>
        <div className={styles.navItems}>
          <Link to={Routes.listing}>Listing</Link>
          <Link to={Routes.marketplace}>Market Place</Link>
          <Link to={Routes.agents}>Agent List</Link>
          <Link to={Routes.about}>About </Link>
          <Link to={Routes.contact}>Contact </Link>
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
