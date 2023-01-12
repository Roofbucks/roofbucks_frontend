import * as React from "react";
import styles from "./styles.module.css";
import { CloseIcon2 } from "assets";

const ActivityCard = () => {
  return (
    <div className={styles.activity}>
      <p className={styles.activityTxt1}>22 minutes ago</p>
      <p className={styles.activityTxt2}>
        A new property Listing got approved.
      </p>
      <CloseIcon2 role="button" className={styles.activityClose} />
    </div>
  );
};

const ActivityList = () => {
  return (
    <div>
      <p className={styles.activityTtl}>Activity</p>
      <div className={styles.activityList}>
        <ActivityCard />
        <ActivityCard />
        <ActivityCard />
        <ActivityCard />
        <ActivityCard />
      </div>
    </div>
  );
};

export { ActivityList };
