import { dashboardImg } from "assets";
import { Button } from "components";
import * as React from "react";
import { GetStartedBtn } from "../../home/hero";
import styles from "./styles.module.css";

interface DashboardProps {
  handleSignup: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ handleSignup }) => {
  return (
    <>
      <section className={styles.dashboardBg}>
        <div className={`appContainer ${styles.dashboard}`}>
          <div className={styles.txtSec}>
            <h4 className={styles.ttl}>
              Manage and organise your home and assets
            </h4>
            <img
              className={styles.imgMobile}
              src={dashboardImg}
              alt="dashbord preview on mac book"
            />
            <p className={styles.txt}>
              Get full control and manage your home and assets from our user
              friendly dashboard. Track your activities and view your
              performance from your interactive dashboard.
            </p>
            <GetStartedBtn handleClick={handleSignup} className={styles.btn} />
          </div>
          <img data-aos="zoom-in"
            className={styles.img}
            src={dashboardImg}
            alt="dashbord preview on mac book"
          />
        </div>
      </section>
    </>
  );
};
export { Dashboard };
