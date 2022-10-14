import {
  CaretRight,
  ChevronUpIcon,
  ClockIconOutline,
  CloseIcon2,
  HouseIcon,
  MoneyBagIcon2,
  MoneyIcon2,
} from "assets";
import * as React from "react";
import styles from "./styles.module.css";
import {
  Dropdown,
  DropdownItemType,
  DropdownListItem,
  MyDateRangePicker,
  Table,
  TableHeaderItemProps,
  TransactionTable,
} from "components";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "chart.js/auto";
import { Calendar } from "react-date-range";

ChartJS.unregister();
ChartJS.register(ArcElement, Tooltip, Legend, Filler);

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const data = {
  labels,
  datasets: [
    {
      label: "$",
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
      display: false,
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
      display: false,
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

  const tableHeaderTitles: TableHeaderItemProps[] = [
    { title: "Property ID" },
    { title: "Property Name" },
    { title: "Invoice ID" },
    { title: "Amount" },
    { title: "Date" },
    { title: "Action" },
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
          <p className={styles.tableTtl}>Recent Transactions</p>
          <div className={` ${styles.tableWrap}`}>
            <Table
              tableHeaderTitles={tableHeaderTitles}
              tableBody={
                <TransactionTable
                  tableBodyItems={[
                    {
                      propertyID: "#C123456",
                      propertyName: "Mathia’s Family Ho..",
                      invoiceID: "#C123456",
                      amount: "$1,200.00",
                      date: "14/12/2022",
                    },
                    {
                      propertyID: "#C123456",
                      propertyName: "Mathia’s Family Ho..",
                      invoiceID: "#C123456",
                      amount: "$1,200.00",
                      date: "14/12/2022",
                    },
                    {
                      propertyID: "#C123456",
                      propertyName: "Mathia’s Family Ho..",
                      invoiceID: "#C123456",
                      amount: "$1,200.00",
                      date: "14/12/2022",
                    },
                    {
                      propertyID: "#C123456",
                      propertyName: "Mathia’s Family Ho..",
                      invoiceID: "#C123456",
                      amount: "$1,200.00",
                      date: "14/12/2022",
                    },
                    {
                      propertyID: "#C123456",
                      propertyName: "Mathia’s Family Ho..",
                      invoiceID: "#C123456",
                      amount: "$1,200.00",
                      date: "14/12/2022",
                    },
                  ]}
                />
              }
              customTableClasses={{ tableWrapperClass: styles.tableWrap }}
              emptyTableElement={{
                show:
                  [
                    {
                      name: "string;",
                      university: "string;",
                      student: "string;",
                      status: "string;",
                    },
                  ].length <= 0,
                text: "You have no transactions",
              }}
            />
          </div>
        </div>
        <aside className={styles.extra}>
          <div className={styles.scheduleSec}>
            <p className={styles.scheduleTtl}>Schedule</p>
            <Calendar
              className={styles.calendarWrap}
              showMonthAndYearPickers={false}
            />
            <div className={styles.visitList}>
              <div className={styles.visit}>
                <ClockIconOutline className={styles.visitClock} />
                <div className={styles.visitTxtSec}>
                  <p className={styles.visitTtl}>Site visit with client</p>
                  <p className={styles.visitTime}>09:30pm</p>
                </div>
                <CaretRight role="button" className={styles.visitCaret} />
              </div>
              <div className={styles.visit}>
                <ClockIconOutline className={styles.visitClock} />
                <div className={styles.visitTxtSec}>
                  <p className={styles.visitTtl}>Site visit with client</p>
                  <p className={styles.visitTime}>09:30pm</p>
                </div>
                <CaretRight role="button" className={styles.visitCaret} />
              </div>
              <div className={styles.visit}>
                <ClockIconOutline className={styles.visitClock} />
                <div className={styles.visitTxtSec}>
                  <p className={styles.visitTtl}>Site visit with client</p>
                  <p className={styles.visitTime}>09:30pm</p>
                </div>
                <CaretRight role="button" className={styles.visitCaret} />
              </div>
            </div>
          </div>
          <div>
            <p className={styles.activityTtl}>Activity</p>
            <div className={styles.activityList}>
              <div className={styles.activity}>
                <p className={styles.activityTxt1}>22 minutes ago</p>
                <p className={styles.activityTxt2}>
                  A new property Listing got approved.
                </p>
                <CloseIcon2 role="button" className={styles.activityClose} />
              </div>
              <div className={styles.activity}>
                <p className={styles.activityTxt1}>22 minutes ago</p>
                <p className={styles.activityTxt2}>
                  A new property Listing got approved.
                </p>
                <CloseIcon2 role="button" className={styles.activityClose} />
              </div>
              <div className={styles.activity}>
                <p className={styles.activityTxt1}>22 minutes ago</p>
                <p className={styles.activityTxt2}>
                  A new property Listing got approved.
                </p>
                <CloseIcon2 role="button" className={styles.activityClose} />
              </div>
              <div className={styles.activity}>
                <p className={styles.activityTxt1}>22 minutes ago</p>
                <p className={styles.activityTxt2}>
                  A new property Listing got approved.
                </p>
                <CloseIcon2 role="button" className={styles.activityClose} />
              </div>
              <div className={styles.activity}>
                <p className={styles.activityTxt1}>22 minutes ago</p>
                <p className={styles.activityTxt2}>
                  A new property Listing got approved.
                </p>
                <CloseIcon2 role="button" className={styles.activityClose} />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export { OverviewUI };
