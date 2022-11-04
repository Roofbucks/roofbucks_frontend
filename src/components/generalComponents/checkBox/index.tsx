import * as React from "react";
import styles from "./styles.module.css";

interface CheckProps {
  label: string;
  check: boolean;
  className?: string;
  onChange: () => void;
}

const CheckBox: React.FC<CheckProps> = ({
  label,
  check,
  className,
  onChange,
}) => {
  return (
    <div className={`${styles.check} ${className}`}>
      <label>
        <input checked={check} onChange={onChange} type={"checkbox"} />
        <span className={styles.mark}></span>
      </label>
      <span>{label}</span>
    </div>
  );
};

export { CheckBox };
