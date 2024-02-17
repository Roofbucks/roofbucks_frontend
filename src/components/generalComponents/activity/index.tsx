import * as React from "react";
import styles from "./styles.module.css";
import { CloseIcon2 } from "assets";

export interface ActivityData {
  date: string;
  message: string;
  id: string;
}

interface ActivityProps extends ActivityData {
  handleRemove: (id) => void;
}

const ActivityCard: React.FC<ActivityProps> = ({
  message,
  date,
  id,
  handleRemove,
}) => {
  return (
    <div className={styles.activity}>
      <p className={styles.activityTxt1}>{date}</p>
      <p className={styles.activityTxt2}>{message}</p>
      <CloseIcon2
        onClick={() => handleRemove(id)}
        role="button"
        className={styles.activityClose}
      />
    </div>
  );
};

interface ActivityListProps {
  className?: string;
  activities: ActivityData[];
  handleRemove: (id) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({
  className,
  activities,
  handleRemove,
}) => {
  return (
    <div className={className}>
      <p className={styles.activityTtl}>Activity</p>
      <div className={styles.activityList}>
        {activities.map((item) => (
          <ActivityCard {...item} handleRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
};

export { ActivityList };
