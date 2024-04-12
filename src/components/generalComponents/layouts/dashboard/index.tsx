import {
  CaretRight,
  FinancesIcon,
  InboxIcon,
  LogoutIcon,
  MenuOpen,
  OverviewIcon,
  PropertiesIcon,
  SettingsIcon,
  SupportIcon,
  UserIcon,
  UserIcon2,
} from "assets";
import { LogoWithText, useOutsideAlerter } from "components";
import * as React from "react";
import { Link } from "react-router-dom";
import { Routes } from "router";
import styles from "./styles.module.css";
import { useAppSelector } from "redux/hooks";
import { Logout } from "./logoutPrompt";
import { AuthMenuDropdown } from "../general/navbar";

interface SidebarType {
  active: dashboardPages;
  state: dashboardPages | "Logout" | "Support" | "Create profile";
  url?: string;
  type: "link" | "button";
  action?: () => void;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const SidebarItem: React.FC<SidebarType> = ({
  active,
  state,
  type,
  url = Routes.overview,
  action,
  Icon,
}) => {
  return (
    <li
      className={`${styles.sidebarItem} ${
        active === state ? styles.activeItem : ""
      }`}
    >
      {type === "link" ? (
        <Link onClick={action} className={styles.sidebarType} to={url}>
          <Icon className={styles.sidebarIcon} />
          <span className={styles.sidebarText}>{state}</span>
        </Link>
      ) : (
        <button className={styles.sidebarType} onClick={action}>
          <Icon className={styles.sidebarIcon} />
          <span className={styles.sidebarText}>{state}</span>
        </button>
      )}
    </li>
  );
};

type dashboardPages =
  | "Overview"
  | "Properties"
  | "Finances"
  // | "Inbox"
  | "Settings";

export interface DashboardLayoutProps {
  active: dashboardPages;
  children: any;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  active,
  children,
}) => {
  const { role, avatar, firstName } = useAppSelector((state) => state.user);
  const [showMenuDropdown, setShowMenuDropdown] = React.useState(false);

  const items: SidebarType[] = [
    {
      active,
      state: "Overview",
      url: Routes.overview,
      type: "link",
      Icon: OverviewIcon,
      action: () => setShowMenu(false),
    },
    {
      active,
      state: "Properties",
      url: Routes.properties,
      type: "link",
      Icon: PropertiesIcon,
      action: () => setShowMenu(false),
    },
    {
      active,
      state: "Finances",
      url: Routes.finances,
      type: "link",
      Icon: FinancesIcon,
      action: () => setShowMenu(false),
    },
    // {
    //   active,
    //   state: "Inbox",
    //   url: Routes.inbox,
    //   type: "link",
    //   Icon: InboxIcon,
    //   action: () => setShowMenu(false),
    // },
    {
      active,
      state: "Settings",
      url: Routes.settings,
      type: "link",
      Icon: SettingsIcon,
      action: () => setShowMenu(false),
    },
    {
      active,
      state: "Create profile",
      url: Routes.profileSetup(""),
      type: "link",
      Icon: UserIcon2,
      action: () => setShowMenu(false),
    },
    {
      active,
      state: "Logout",
      type: "button",
      action: () => setShowLogout(true),
      Icon: LogoutIcon,
    },
    {
      active,
      state: "Support",
      url: Routes.contact,
      type: "link",
      Icon: SupportIcon,
      action: () => setShowMenu(false),
    },
  ];

  let SidebarItems: SidebarType[] = items;

  let completion = localStorage.getItem("profileCompletion");
  if (completion) {
    const completionObj = JSON.parse(completion);

    if (
      role === "agent" ||
      (role === "shareholder" && completionObj.profile && completionObj.billing)
    )
      SidebarItems = SidebarItems.filter(
        (item) => item.state !== "Create profile"
      );
  }

  const [showMenu, setShowMenu] = React.useState(false);
  const [showLogout, setShowLogout] = React.useState(false);

  const menuRef = React.useRef(null);

  const onHide = () => {
    setShowMenu(false);
  };
  useOutsideAlerter(menuRef, onHide);

  return (
    <>
      <Logout show={showLogout} closeModal={() => setShowLogout(false)} />
      <main className={styles.main}>
        <nav className={`${styles.sideBar} ${showMenu ? styles.overLay : ""}`}>
          <div className={styles.mobileNav}>
            <Link to={Routes.home}>
              <LogoWithText className={styles.logo} type={"light"} />
            </Link>
            <MenuOpen
              role="button"
              onClick={() => setShowMenu(!showMenu)}
              className={styles.menuBtn}
            />
          </div>
          <ul ref={menuRef} className={styles.sidebarList}>
            {SidebarItems.map((item, index) => (
              <SidebarItem {...item} key={index} />
            ))}
          </ul>
        </nav>
        <header className={styles.navBar}>
          <div className={styles.profileSec}>
            <span className={styles.profile} role={"button"}>
              <img src={avatar} alt="" />
              <CaretRight
                onClick={() => setShowMenuDropdown(!showMenuDropdown)}
              />
              <AuthMenuDropdown
                show={showMenuDropdown}
                closeMenu={(x) => setShowMenuDropdown(x)}
                logout={() => {
                  setShowMenuDropdown(false);
                  setShowLogout(true);
                }}
                links={["Home", "Profile"]}
                className={styles.menuDropdown}
                role={role}
              />
            </span>
            <p>Welcome Back {firstName}!</p>
          </div>
        </header>
        <div className={styles.content}>{children}</div>
      </main>
    </>
  );
};

export { DashboardLayout };
export * from "./logoutPrompt";
