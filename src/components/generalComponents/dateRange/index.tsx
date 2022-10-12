import { CalendarIconOutline } from "assets";
import * as React from "react";
import styles from "./styles.module.css";
import { DateRangePicker, Range } from "react-date-range";

const useOutsideAlerter = (ref: any, closeFunction: () => any) => {
  React.useEffect(() => {
    /**
     * Hide if clicked on outside of element
     */
    const handleClickOutside = (event: { target: any }) => {
      if (ref.current && !ref.current.contains(event.target)) {
        closeFunction && closeFunction();
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

interface DateRangeProps {
  className?: string;
}

const MyDateRangePicker: React.FC<DateRangeProps> = ({ className }) => {
  const [showRangePicker, setShowRangePicker] = React.useState(false);
  const [statRange, setStatRange] = React.useState<Range[]>([
    {
      startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const rangeBody = React.useRef(null);
  useOutsideAlerter(rangeBody, () => setShowRangePicker(false));

  return (
    <div ref={rangeBody} className={`${styles.showDate} ${className}`}>
      <CalendarIconOutline
        role="button"
        onClick={() => setShowRangePicker(!showRangePicker)}
        className={styles.showDateRangeIcon}
      />
      {showRangePicker ? (
        <DateRangePicker
          className={styles.dateRange}
          editableDateInputs={true}
          onChange={(item) => setStatRange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={statRange}
          showPreview={false}
          showDateDisplay={true}
          showMonthAndYearPickers={true}
        />
      ) : (
        ""
      )}
      <p>{statRange[0].startDate?.toLocaleDateString()}</p>-
      <p>{statRange[0].endDate?.toLocaleDateString()}</p>
    </div>
  );
};

export { MyDateRangePicker };
