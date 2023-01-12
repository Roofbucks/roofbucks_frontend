import {
  avatar,
  CaretRight,
  FinancesIcon,
  InboxIcon,
  LogoutIcon,
  OverviewIcon,
  PropertiesIcon,
  SettingsIcon,
  SupportIcon,
} from "assets";
import { LogoWithText } from "components";
import * as React from "react";
import { Link } from "react-router-dom";
import { Routes } from "router";
import { users } from "types";
import styles from "./styles.module.css";

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
        <Link className={styles.sidebarType} to={url}>
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
  let user: users = "shareHolder";
  const items: SidebarType[] = [
    {
      active,
      state: "Overview",
      url: Routes.overview,
      type: "link",
      Icon: OverviewIcon,
    },
    {
      active,
      state: "Properties",
      url: Routes.properties,
      type: "link",
      Icon: PropertiesIcon,
    },
    {
      active,
      state: "Finances",
      url: Routes.finances,
      type: "link",
      Icon: FinancesIcon,
    },
    {
      active,
      state: "Inbox",
      url: Routes.inbox,
      type: "link",
      Icon: InboxIcon,
    },
    {
      active,
      state: "Settings",
      url: Routes.settings,
      type: "link",
      Icon: SettingsIcon,
    },
    {
      active,
      state: "Logout",
      type: "button",
      action: () => console.log("logout"),
      Icon: LogoutIcon,
    },
  ];

  const support: SidebarType = {
    active,
    state: "Support",
    url: Routes.contact,
    type: "link",
    Icon: SupportIcon,
  };

  const SidebarItems: SidebarType[] = items.filter((item) =>
    user === "agent" ? item.state !== "Inbox" : item
  );

  return (
    <>
      <main className={styles.main}>
        <aside className={styles.sideBar}>
          <LogoWithText className={styles.logo} type={"light"} />
          <ul className={styles.sidebarList}>
            {SidebarItems.map((item, index) => (
              <SidebarItem {...item} key={index} />
            ))}
          </ul>

          <SidebarItem {...support} />
        </aside>
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
