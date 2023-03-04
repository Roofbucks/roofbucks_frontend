import {
  avatar,
  BellIconOutline,
  CaretRight,
  ChevronIcon,
  MenuClose,
  MenuOpen,
} from "assets";
import {
  Button,
  LogoWithText,
  useOutsideAlerter,
} from "components/generalComponents";
import * as React from "react";
import { Link } from "react-router-dom";
import { Routes } from "router";
import styles from "./styles.module.css";

export interface NavbarProps {
  active?: "home" | "listing" | "marketplace" | "agents" | "about" | "contact";
  login: () => void;
  signup: () => void;
  closeNav: () => void;
  openNav: () => void;
  showNav: boolean;
  auth: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  active,
  login,
  signup,
  auth,
  closeNav,
  showNav,
  openNav,
}) => {
  const [showMenuDropdown, setShowMenuDropdown] = React.useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = React.useState(false);
  const [mobile, setMobile] = React.useState(
    window.innerWidth <= 800 ? true : false
  );

  const screenSizeUpdate = () => {
    if (window.innerWidth <= 900) {
      setMobile(true);
    } else if (window.innerWidth > 900) {
      setMobile(false);
      closeNav();
    }
  };
  window.onresize = screenSizeUpdate;
  window.onload = screenSizeUpdate;
  
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
            onClick={closeNav}
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
            onClick={() => closeNav()}
          />
        ) : (
          <MenuOpen
            className={styles.openMenu}
            role={"button"}
            onClick={() => openNav()}
          />
        )}
        {(mobile && showNav) || !mobile ? (
          <>
            <div className={styles.navItems}>
              {mobile ? (
                <Link
                  className={active === "home" ? styles.activeItem : ""}
                  onClick={closeNav}
                  to={Routes.home}
                >
                  Home
                </Link>
              ) : (
                ""
              )}
              <Link
                className={active === "listing" ? styles.activeItem : ""}
                onClick={closeNav}
                to={Routes.listing}
              >
                Listing
              </Link>
              <Link
                className={active === "marketplace" ? styles.activeItem : ""}
                onClick={closeNav}
                to={Routes.marketplace}
              >
                Marketplace
              </Link>
              <Link
                className={active === "agents" ? styles.activeItem : ""}
                onClick={closeNav}
                to={Routes.agents}
              >
                Agent List
              </Link>
              <Link
                className={active === "about" ? styles.activeItem : ""}
                onClick={closeNav}
                to={Routes.about}
              >
                About{" "}
              </Link>
              <Link
                className={active === "contact" ? styles.activeItem : ""}
                onClick={closeNav}
                to={Routes.contact}
              >
                Contact{" "}
              </Link>
            </div>
            {!auth ? (
              <div className={styles.btnWrap}>
                <Button
                  className={styles.loginBtn}
                  onClick={login}
                  type="tertiary"
                >
                  Login
                </Button>
                <Button onClick={signup} type="primary">
                  Sign Up
                </Button>
              </div>
            ) : (
              <div className={styles.authMenu}>
                <div
                  className={`${styles.notifWrap} ${styles.notifRed} ${
                    showNotifDropdown ? styles.disableCaret : ""
                  }`}
                >
                  <BellIconOutline
                    role="button"
                    className={styles.notif}
                    onClick={() => setShowNotifDropdown(true)}
                  />
                  <NotifDropdown
                    show={showNotifDropdown}
                    closeMenu={(x) => setShowNotifDropdown(x)}
                    className={styles.notifDropdownWrap}
                  />
                </div>
                <img src={avatar} alt="" />
                <p>Hi Daniel</p>
                <div
                  className={`${showMenuDropdown ? styles.disableCaret : ""}`}
                >
                  <CaretRight
                    className={styles.dropdownCaret}
                    role="button"
                    onClick={() => setShowMenuDropdown(true)}
                  />
                  <AuthMenuDropdown
                    show={showMenuDropdown}
                    closeMenu={(x) => setShowMenuDropdown(x)}
                  />
                </div>
              </div>
            )}
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

interface MenuDropdownProps {
  show: boolean;
  className?: string;
  children: any;
  closeMenu: (x: boolean) => void;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({
  show,
  className,
  children,
  closeMenu,
}) => {
  const listRef = React.useRef(null);

  const onHide = () => {
    closeMenu(false);
  };

  useOutsideAlerter(listRef, onHide);

  if (!show) return null;

  return (
    <div ref={listRef} className={`${styles.authMenuDropdown} ${className}`}>
      <ChevronIcon className={styles.chevron} />
      {children}
    </div>
  );
};

interface AuthMenuDropdownProps {
  show: boolean;
  className?: string;
  closeMenu: (x: boolean) => void;
}

const AuthMenuDropdown: React.FC<AuthMenuDropdownProps> = ({
  show,
  className = "",
  closeMenu,
}) => {
  return (
    <MenuDropdown show={show} className={className} closeMenu={closeMenu}>
      <ul className={styles.authMenuList}>
        <li>Home</li>
        <li>My Dashboard</li>
        <li>My Cart</li>
        <li className={styles.activeMenuItem}>Profile</li>
        <li>Logout</li>
      </ul>
    </MenuDropdown>
  );
};

const NotifDropdown: React.FC<AuthMenuDropdownProps> = ({
  show,
  className = "",
  closeMenu,
}) => {
  return (
    <MenuDropdown show={show} className={className} closeMenu={closeMenu}>
      <div className={styles.notifHdSec}>
        <p className={styles.notifHeading}>Notifications</p>{" "}
        <button>Clear all</button>
      </div>
      <div className={styles.notifList}>
        <div className={styles.notifCard}>
          <p className={styles.notifTtl}>
            Welcome to Roofbucks{" "}
            <span className={`${styles.notifTime} ${styles.newNotif}`}>
              08:35PM{" "}
            </span>
          </p>
          <p className={styles.notifTxt}>You can do a lot with Roofbucks</p>
        </div>
        <div className={styles.notifCard}>
          <p className={styles.notifTtl}>
            Welcome to Roofbucks{" "}
            <span className={styles.notifTime}>08:35PM </span>
          </p>
          <p className={styles.notifTxt}>You can do a lot with Roofbucks</p>
        </div>
        <div className={styles.notifCard}>
          <p className={styles.notifTtl}>
            Welcome to Roofbucks{" "}
            <span className={styles.notifTime}>08:35PM </span>
          </p>
          <p className={styles.notifTxt}>You can do a lot with Roofbucks</p>
        </div>
      </div>
    </MenuDropdown>
  );
};
