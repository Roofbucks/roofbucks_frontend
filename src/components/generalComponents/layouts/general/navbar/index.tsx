import {
  BellIconOutline,
  CaretRight,
  ChevronIcon,
  MenuClose,
  MenuOpen,
} from "assets";
import {
  Button,
  Logout,
  LogoWithText,
  useOutsideAlerter,
} from "components/generalComponents";
import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Routes } from "router";
import styles from "./styles.module.css";
import { useAppSelector } from "redux/hooks";

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
  const { avatar, firstName, role } = useAppSelector((state) => state.user);

  const [showMenuDropdown, setShowMenuDropdown] = React.useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = React.useState(false);
  const [showLogout, setShowLogout] = React.useState(false);
  const [mobile, setMobile] = React.useState(
    window.innerWidth <= 900 ? true : false
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
    <>
      <Logout show={showLogout} closeModal={() => setShowLogout(false)} />
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
                  {/* <div
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
                  </div> */}
                  <img src={avatar} alt="" />
                  <p>Hi {firstName}</p>
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
                      logout={() => {
                        closeNav();
                        setShowMenuDropdown(false);
                        setShowLogout(true);
                      }}
                      links={["My Dashboard", "Profile"]}
                      role={role}
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
    </>
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
  logout: () => void;
  links: string[];
  role: string;
}

export const AuthMenuDropdown: React.FC<AuthMenuDropdownProps> = ({
  show,
  className = "",
  closeMenu,
  logout,
  links,
  role,
}) => {
  const navigate = useNavigate();
  const { id } = useAppSelector((state) => state.user);

  const isAgent = role === "agent";
  const profileCompletion = JSON.parse(
    localStorage.getItem("profileCompletion") ?? "{}"
  );
  const profileIncomplete =
    !profileCompletion.billing ||
    !profileCompletion.business ||
    !profileCompletion.profile;

  const menuItems = [
    {
      label: "Home",
      onClick: () => navigate(Routes.home),
    },
    {
      label: "My Dashboard",
      onClick: () => navigate(Routes.overview),
    },
  ];

  if (isAgent) {
    menuItems.push({
      label: "Profile",
      onClick: () => navigate(Routes.profileID(id)),
    });
  }

  const items: any = profileIncomplete && isAgent ? [] : menuItems;

  if (isAgent && profileIncomplete) {
    const completeProfile = () => {
      if (!profileCompletion.profile) {
        return navigate(Routes.profileSetup("?profile=true"));
      } else if (!profileCompletion.business) {
        return navigate(Routes.profileSetup("?business=true"));
      } else if (!profileCompletion.billing) {
        return navigate(Routes.profileSetup("?billing=true"));
      }
    };

    items.push({
      label: "Complete profile",
      onClick: completeProfile,
    });
  } else if (!isAgent && profileIncomplete) {
    const completeProfile = () => {
      if (!profileCompletion.profile) {
        return navigate(Routes.profileSetup("?profile=true"));
      } else if (!profileCompletion.business) {
        return navigate(Routes.profileSetup("?business=true"));
      }
    };

    items.push({
      label: "Complete profile",
      onClick: completeProfile,
    });
  }

  return (
    <MenuDropdown show={show} className={className} closeMenu={closeMenu}>
      <ul className={styles.authMenuList}>
        {items
          .filter((item) => links.includes(item.label))
          .map((item, index) => (
            <li
              key={`link_${index}`}
              role="button"
              onClick={() => {
                item.onClick();
                closeMenu(false);
              }}
            >
              {item.label}
            </li>
          ))}

        <li role="button" onClick={logout}>
          Logout
        </li>
      </ul>
    </MenuDropdown>
  );
};

interface NotifDropdownProps {
  show: boolean;
  className?: string;
  closeMenu: (x: boolean) => void;
}

const NotifDropdown: React.FC<NotifDropdownProps> = ({
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
