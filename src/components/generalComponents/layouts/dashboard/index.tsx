import {
  avatar,
  CaretRight,
  FinancesIcon,
  InboxIcon,
  LogoutIcon,
  MenuOpen,
  OverviewIcon,
  PropertiesIcon,
  SettingsIcon,
  SupportIcon,
} from "assets";
import { LogoWithText, useOutsideAlerter } from "components";
import * as React from "react";
import { Link } from "react-router-dom";
import { Routes } from "router";
import { users } from "types";
import styles from "./styles.module.css";
import { useAppSelector } from "redux/hooks";

interface SidebarType {
  active: dashboardPages;
  state: dashboardPages | "Logout" | "Support";
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
  | "Inbox"
  | "Settings";

export interface DashboardLayoutProps {
  active: dashboardPages;
  children: any;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  active,
  children,
}) => {
  const {role: user} =  useAppSelector(state => state.user)

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
    {
      active,
      state: "Inbox",
      url: Routes.inbox,
      type: "link",
      Icon: InboxIcon,
      action: () => setShowMenu(false),
    },
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
      state: "Logout",
      type: "button",
      action: () => console.log("logout"),
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

  const SidebarItems: SidebarType[] = items.filter((item) =>
    user === "agent" ? item.state !== "Inbox" : item
  );

  const [showMenu, setShowMenu] = React.useState(false);

  const menuRef = React.useRef(null);

  const onHide = () => {
    setShowMenu(false);
  };
  useOutsideAlerter(menuRef, onHide);

  return (
    <>
      <main className={styles.main}>
        <nav className={`${styles.sideBar} ${showMenu ? styles.overLay : ""}`}>
          <div className={styles.mobileNav}>
            <LogoWithText className={styles.logo} type={"light"} />
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
              <CaretRight />
            </span>
            <p>Welcome Back Jane!</p>
          </div>
        </header>
        <div className={styles.content}>{children}</div>
      </main>
    </>
  );
};

export { DashboardLayout };
