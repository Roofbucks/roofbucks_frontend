import {
  CalendarIconOutline,
  CaretRight,
  ChevronUpIcon,
  ClockIconOutline,
  CloseIcon2,
  EmptyStreet,
  HouseIcon,
  MoneyBagIcon2,
  MoneyIcon2,
  avatar,
} from "assets";
import * as React from "react";
import styles from "./styles.module.css";
import {
  ActivityList,
  Dropdown,
  DropdownItemType,
  DropdownListItem,
  MyDateRangePicker,
  Table,
  TableHeaderItemProps,
  TransactionTable,
  TransactionTableItem,
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
ChartJS.defaults.font.family = "inherit";
ChartJS.defaults.font.size = 18;

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

const StatCard: React.FC<StatInfo> = ({
  title,
  total,
  percentage,
  increase,
  difference,
}) => {
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
  const [showMobileCalendar, setShowMobileCalendar] = React.useState(false);
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
    { title: "" },
  ];

  const tableItem: TransactionTableItem = {
    propertyID: "#C123456",
    propertyName: "Mathia’s Family Ho..",
    invoiceID: "#C123456",
    amount: "$1,200.00",
    date: "14/12/2022",
  };

  const tableBodyItems: TransactionTableItem[] = new Array(10).fill(tableItem);

  const statList: StatInfo[] = [
    {
      title: "Total Listing",
      total: 140,
      percentage: 0.5,
      increase: true,
      difference: 12,
    },
    {
      title: "Total Closing",
      total: 140,
      percentage: 0.5,
      increase: true,
      difference: 12,
    },
    {
      title: "Total Active",
      total: 140,
      percentage: 0.5,
      increase: true,
      difference: 12,
    },
    {
      title: "Total Inactive",
      total: 140,
      percentage: 0.5,
      increase: true,
      difference: 12,
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.profileSec}>
            <img src={avatar} alt="" />
            <p>Welcome Back Jane!</p>
          </div>
          <div>
            <MyDateRangePicker className={styles.statRange} />

            <div className={`${styles.statList} ${styles.secWrap}`}>
              {statList.map((item, index) => (
                <StatCard {...item} key={index} />
              ))}
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
          <div className={`${styles.tableWrap}`}>
            <Table
              tableHeaderTitles={tableHeaderTitles}
              tableBody={
                <TransactionTable
                  viewInvoice={() => {}}
                  viewProperty={() => {}}
                  printInvoice={() => {}}
                  tableBodyItems={tableBodyItems}
                />
              }
              customTableClasses={{ tableWrapperClass: styles.table }}
              emptyTable={{
                show: tableBodyItems.length <= 0,
                element: <EmptyTransactions />,
              }}
            />
          </div>
        </div>
        <aside className={styles.extra}>
          <div className={styles.scheduleSec}>
            <div className={styles.scheduleTtlSec}>
              <p className={styles.scheduleTtl}>Schedule</p>
              <button
                onClick={() => setShowMobileCalendar(!showMobileCalendar)}
              >
                <CalendarIconOutline /> Jan 1, 2022
              </button>
            </div>
            <Calendar
              className={`${styles.calendarWrap} ${
                showMobileCalendar ? styles.showMobileCalendar : ""
              }`}
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
          <ActivityList />
        </aside>
      </div>
    </>
  );
};

const EmptyTransactions = () => {
  return (
    <div className={styles.emptySec}>
      <EmptyStreet />
      <p>You have no recent transactions</p>
    </div>
  );
};

export { OverviewUI };
