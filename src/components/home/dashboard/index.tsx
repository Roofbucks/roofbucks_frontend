import { dashboardImg } from "assets";
import { Button } from "components";
import * as React from "react";
import { GetStartedBtn } from "../hero";
import styles from "./styles.module.css";

const Dashboard = () => {
  return (
    <>
      <section className={styles.dashboardBg}>
        <div className={`appContainer ${styles.dashboard}`}>
          <div className={styles.txtSec}>
            <h4 className={styles.ttl}>Manage and organize your assets and properties</h4>
            <p className={styles.txt} >
              Get full control and manage your assets like a pro from your
              Roofbucks dashboard. View your assets real-time performance,book
              stays and list your assets' shares for sell from your dashboard.
            </p>
            <GetStartedBtn className={styles.btn} />
          </div>
          <img className={styles.img} src={dashboardImg} alt="dashbord preview on mac book" />
        </div>
      </section>
    </>
  );
};
export { Dashboard };
