import {
  ChevronUpIcon,
  EmptyStreet,
  HouseIcon,
  MoneyBagIcon2,
  MoneyIcon2,
  avatar,
} from "assets";
import * as React from "react";
import styles from "./styles.module.css";
import {
  ActivityData,
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

ChartJS.unregister();
ChartJS.register(ArcElement, Tooltip, Legend, Filler);
ChartJS.defaults.font.family = "inherit";
ChartJS.defaults.font.size = 18;

export interface StatInfo {
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
        <p className={styles.statTxt1}>{title}</p>
        <p className={styles.statTxt2}>{total}</p>
        <p className={styles.statTxt3}>
          <span>{difference}</span> ({percentage}%){" "}
          <ChevronUpIcon className={!increase ? styles.downwardRed : ""} />
        </p>
      </div>
    </div>
  );
};

export interface EarningTrendsData {
  totalEarning: number;
  avgIncome: number;
  graph: { label: string; value: number }[];
}

interface OverviewUIProps {
  transactions: TransactionTableItem[];
  handleViewProperty: (id) => void;
  isAgent: boolean;
  name: string;
  avatar: string;
  stats: StatInfo[];
  activity: ActivityData[];
  handleRemoveActivity: (id) => void;
  statDateFilter: {
    start: string;
    end: string;
    onChange: (start, end) => void;
  };
  graphDateFilter: {
    start: string;
    end: string;
    onChange: (start, end) => void;
  };
  graphEarningFilter: {
    value: string;
    onChange: (value) => void;
  };
  graphDurationFilter: {
    value: string;
    onChange: (value) => void;
  };
  earningTrend: EarningTrendsData;
  handleReceipt: (data: TransactionTableItem) => void;
}

const OverviewUI: React.FC<OverviewUIProps> = ({
  transactions,
  handleViewProperty,
  isAgent,
  name,
  avatar,
  stats,
  activity,
  handleRemoveActivity,
  statDateFilter,
  graphDateFilter,
  graphDurationFilter,
  graphEarningFilter,
  earningTrend,
  handleReceipt,
}) => {
  const EarningsFilter: DropdownItemType[] = [
    {
      label: "Monthly",
      value: "monthly",
    },
    {
      label: "Yearly",
      value: "yearly",
    },
  ];

  const tableHeaderTitles: TableHeaderItemProps[] = [
    { title: "Property ID" },
    { title: "Property Name" },
    { title: "Reference ID" },
    { title: "Amount" },
    { title: "Status" },
    { title: "Date" },
    { title: "" },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.profileSec}>
            <img src={avatar} alt="" />
            <p>Welcome Back {name}!</p>
          </div>
          {isAgent && stats.length > 0 ? (
            <div>
              <MyDateRangePicker
                className={styles.statRange}
                startDate={statDateFilter.start}
                endDate={statDateFilter.end}
                handleChange={statDateFilter.onChange}
              />
              <div className={`${styles.statList} ${styles.secWrap}`}>
                {stats.map((item, index) => (
                  <StatCard {...item} key={index} />
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
          <div className={`${styles.secWrap} ${styles.trendsWrap}`}>
            <div>
              <div className={styles.trendsHeading}>
                <p>Earning Trends</p>
                <div className={styles.filterWrap}>
                  <fieldset>
                    <label>
                      <input
                        className={
                          graphEarningFilter.value === "income"
                            ? styles.selectedRadio
                            : ""
                        }
                        onClick={() => graphEarningFilter.onChange("income")}
                        checked={graphEarningFilter.value === "income"}
                        type="radio"
                      />{" "}
                      <span>Income</span>
                    </label>
                    <label>
                      <input
                        className={
                          graphEarningFilter.value === "rent"
                            ? styles.selectedRadio
                            : ""
                        }
                        onClick={() => graphEarningFilter.onChange("rent")}
                        checked={graphEarningFilter.value === "rent"}
                        type="radio"
                      />
                      <span>Rent</span>
                    </label>
                  </fieldset>
                  <Dropdown
                    dropdownListClassName={styles.statusDropdownList}
                    active={graphDurationFilter.value}
                    type="select"
                    caretColor="black"
                    className={styles.dropdown}
                  >
                    {EarningsFilter.map((item2, index) => (
                      <DropdownListItem
                        onDropdownChange={(x) =>
                          graphDurationFilter.onChange(x)
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
                <MyDateRangePicker
                  startDate={graphDateFilter.start}
                  endDate={graphDateFilter.end}
                  handleChange={graphDateFilter.onChange}
                />
                <div className={styles.summarySec}>
                  <div className={styles.summary}>
                    <div className={styles.summaryIconSec}>
                      <MoneyBagIcon2 className={styles.summaryIcon} />
                    </div>
                    <div>
                      <p className={styles.summaryValue}>
                        NGN {earningTrend.avgIncome.toLocaleString()}
                      </p>
                      <p className={styles.summaryLabel}>
                        Avg. {graphDurationFilter.value} income
                      </p>
                    </div>
                  </div>
                  <div className={styles.summary}>
                    <div className={styles.summaryIconSec}>
                      <MoneyIcon2 className={styles.summaryIcon} />
                    </div>
                    <div>
                      <p className={styles.summaryValue}>
                        NGN {earningTrend.totalEarning.toLocaleString()}
                      </p>
                      <p className={styles.summaryLabel}>Total Earnings</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.trendsChart}>
                <Graph
                  labels={earningTrend.graph.map((item) => item.label)}
                  values={earningTrend.graph.map((item) => item.value)}
                />
              </div>
            </div>
          </div>
          <p className={styles.tableTtl}>Recent Transactions</p>
          <div className={`${styles.tableWrap}`}>
            <Table
              tableHeaderTitles={tableHeaderTitles}
              tableBody={
                <TransactionTable
                  viewReceipt={handleReceipt}
                  viewProperty={handleViewProperty}
                  tableBodyItems={transactions}
                />
              }
              customTableClasses={{ tableWrapperClass: styles.table }}
              emptyTable={{
                show: transactions.length <= 0,
                element: <EmptyTransactions />,
              }}
            />
          </div>
        </div>
        <aside className={styles.extra}>
          <ActivityList
            activities={activity}
            handleRemove={handleRemoveActivity}
          />
        </aside>
      </div>
    </>
  );
};

interface GraphProps {
  labels: string[];
  values: number[];
}
const Graph: React.FC<GraphProps> = ({ labels, values }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "NGN",
        data: values,
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
            return "NGN" + value;
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

  return (
    <>
      <Bar {...config} />
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
