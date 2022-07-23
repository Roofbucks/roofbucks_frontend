import { Button, LogoWithText } from "components/generalComponents";
import * as React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navBg}>
      <div className={`appContainer ${styles.nav}`}>
        <LogoWithText type="dark" />
        <div className={styles.navItems}>
          <Link to="">Listing</Link>
          <Link to="">Market Place</Link>
          <Link to="">Agent List</Link>
          <Link to="">About </Link>
          <Link to="">Contact </Link>
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
