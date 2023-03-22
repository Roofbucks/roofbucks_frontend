import * as React from "react";
import styles from "./styles.module.css";
import { ChevronIcon } from "assets";

interface PaginationProps {
  current: number;
  total: number;
  handleChange: (x: number) => void;
  count: {
    start: number;
    end: number;
    total: number;
  };
  hide?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  count,
  current,
  total,
  handleChange,
  hide,
}) => {
  const onChange = (e) => handleChange(e.target.value);

  const handleIncrease = () => {
    if (current < total) handleChange(current + 1);
  };

  const handleDecrease = () => {
    if (current > 1) handleChange(current - 1);
  };

  if (hide) return null;

  return (
    <section className={styles.pagination}>
      <p>
        {count.start} - {count.end} of {count.total} Properties
      </p>
      <div className={styles.inputBox}>
        <input
          onChange={onChange}
          value={current}
          className={styles.input}
          type="number"
          max={total}
          min={1}
          disabled={current >= total || current <= 1}
        />
        <span>
          <ChevronIcon
            onClick={handleIncrease}
            role="button"
            className={`${styles.up} ${
              current >= total ? styles.disabled : ""
            }`}
          />
          <ChevronIcon
            onClick={handleDecrease}
            role="button"
            className={`${styles.down} ${current <= 1 ? styles.disabled : ""}`}
          />
        </span>
      </div>
    </section>
  );
};

export { Pagination };
