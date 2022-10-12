import { ChevronUpIcon, HouseIcon, MoneyBagIcon2, MoneyIcon2 } from "assets";
import * as React from "react";
import styles from "./styles.module.css";
import {
  Dropdown,
  DropdownItemType,
  DropdownListItem,
  MyDateRangePicker,
} from "components";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  BarProps,
  BarOptions,
} from "chart.js";
import "chart.js/auto";

ChartJS.unregister();
ChartJS.register(ArcElement, Tooltip, Legend, Filler);

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

const data = {
  labels,
  datasets: [
    {
      label: '$',
      data: [45, 30, 20, 42, 60, 16, 72, 34, 58, 102, 41, 30],
      backgroundColor: "rgba(221, 227, 221, 1)",
      hoverBackgroundColor: "rgb(15, 201, 75)",
      borderRadius: 7,
      barPercentage: 0.7,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      display: false
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
      ticks: {
        // Include a dollar sign in the ticks
        callback: function (value, index, ticks) {
          return "$" + value;
        },
      },
      display: false
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const config = {
  type: "bar",
  data: data,
  options: options,
};

interface StatInfo {
  title: string;
  total: number;
  percentage: number;
  increase: boolean;
  difference: number;
}

const StatCard = () => {
  return (
    <div className={styles.statCard}>
      <HouseIcon className={styles.statIcon} />
      <div className={styles.statInfo}>
        <p className={styles.statTxt1}>Total Listing</p>
        <p className={styles.statTxt2}>140</p>
        <p className={styles.statTxt3}>
          <span>12</span> (0.5%){" "}
          <ChevronUpIcon className={styles.downwardRed} />{" "}
        </p>
      </div>
    </div>
  );
};

const OverviewUI = () => {
  const [earningsFilter, setEarningsFilter] = React.useState({
    period: "Monthly",
    type: "income",
  });
  const EarningsFilter: DropdownItemType[] = [
    {
      value: "Monthly",
      label: "Monthly",
    },
    {
      value: "Yearly",
      label: "Yearly",
    },
  ];
  return (
    <>
      <div className={styles.container}>
        <div className={styles.main}>
          <div>
            <MyDateRangePicker className={styles.statRange} />

            <div className={`${styles.statList} ${styles.secWrap}`}>
              <StatCard />
              <StatCard />
              <StatCard />
              <StatCard />
            </div>
          </div>
          <div className={`${styles.secWrap} ${styles.trendsWrap}`}>
            <div>
              <div className={styles.trendsHeading}>
                <p>Earning Trends</p>
                <div className={styles.filterWrap}>
                  <fieldset>
                    <label>
                      <input
                        className={
                          earningsFilter.type === "income"
                            ? styles.selectedRadio
                            : ""
                        }
                        onClick={() =>
                          setEarningsFilter({
                            ...earningsFilter,
                            type: "income",
                          })
                        }
                        checked={earningsFilter.type === "income"}
                        type="radio"
                      />{" "}
                      <span>Income</span>
                    </label>
                    <label>
                      <input
                        className={
                          earningsFilter.type === "rent"
                            ? styles.selectedRadio
                            : ""
                        }
                        onClick={() =>
                          setEarningsFilter({ ...earningsFilter, type: "rent" })
                        }
                        checked={earningsFilter.type === "rent"}
                        type="radio"
                      />{" "}
                      <span>Rent</span>
                    </label>
                  </fieldset>{" "}
                  <Dropdown
                    dropdownListClassName={styles.statusDropdownList}
                    active={earningsFilter.period}
                    type="select"
                    caretColor="black"
                    className={styles.dropdown}
                  >
                    {EarningsFilter.map((item2, index) => (
                      <DropdownListItem
                        onDropdownChange={(x) =>
                          setEarningsFilter({ ...earningsFilter, period: x })
                        }
                        value={item2.value}
                        key={index}
                      >
                        {item2.label}
                      </DropdownListItem>
                    ))}
                  </Dropdown>
                </div>
              </div>
              <div className={styles.trendsFilterSec}>
                <MyDateRangePicker />
                <div className={styles.summarySec}>
                  <div className={styles.summary}>
                    <div className={styles.summaryIconSec}>
                      <MoneyBagIcon2 className={styles.summaryIcon} />
                    </div>
                    <div>
                      <p className={styles.summaryValue}>$25,000.00</p>
                      <p className={styles.summaryLabel}>Avg. monthly income</p>
                    </div>
                  </div>
                  <div className={styles.summary}>
                    <div className={styles.summaryIconSec}>
                      <MoneyIcon2 className={styles.summaryIcon} />
                    </div>
                    <div>
                      <p className={styles.summaryValue}>$125,000.00</p>
                      <p className={styles.summaryLabel}>Total Earnings</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.trendsChart}>
              <Bar {...config} />
              </div>
            </div>
          </div>
          <div className={`${styles.secWrap}`}>
            <div>
              
            </div>
          </div>
        </div>
        <aside className={styles.extra}>calendar</aside>
      </div>
    </>
  );
};

export { OverviewUI };
