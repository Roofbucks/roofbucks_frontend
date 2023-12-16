import { BarChartIcon, DollarIcon, ProfileIcon } from "assets";
import * as React from "react";
import styles from "./styles.module.css";

interface ProfileSetupUIProps {
  children: any;
  activeView: number;
  role: string;
}

const ProfileSetupUI: React.FC<ProfileSetupUIProps> = ({
  children,
  activeView,
  role,
}) => {
  return (
    <>
      <section className={`appContainer ${styles.header}`}>
        <h1 className={styles.ttl}>Profile</h1>
        <nav className={styles.nav} aria-label="Profile">
          <ul className={styles.navList}>
            <li
              className={`${styles.navItem} ${
                activeView === 1 ? styles.activeItem : ""
              }`}
            >
              <ProfileIcon />
              <p>My Profile</p>
            </li>
            {role === "agent" ? (
              <li
                className={`${styles.navItem} ${
                  activeView === 2 ? styles.activeItem : ""
                }`}
              >
                <BarChartIcon />
                <p>My Business</p>
              </li>
            ) : (
              ""
            )}
            <li
              className={`${styles.navItem} ${
                activeView === 3 ? styles.activeItem : ""
              }`}
            >
              <DollarIcon />
              <p>Billings</p>
            </li>
          </ul>
        </nav>
      </section>
      <section className={styles.formWrapper}>{children}</section>
    </>
  );
};

export { ProfileSetupUI };
export * from "./billing";
export * from "./personal";
export * from "./business";
