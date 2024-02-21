import {
  fetchGraphService,
  fetchStatService,
  fetchTransactionsService,
  markAsReadService,
} from "api";
import {
  ActivityData,
  EarningTrendsData,
  OverviewUI,
  Preloader,
  ReceiptModal,
  StatInfo,
  TransactionTableItem,
} from "components";
import { formatDate, getErrorMessage, timeAgo } from "helpers";
import { useApiRequest } from "hooks";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { updateToast } from "redux/actions";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Routes } from "router";

const months = [
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

// Create a new Date object for today's date
let pastThirtyDays = new Date();
// Subtract 30 days from the current date
pastThirtyDays.setDate(pastThirtyDays.getDate() - 30);

// Create a new Date object for today's date
let pastYear = new Date();
// Subtract 30 days from the current date
pastYear.setDate(pastYear.getDate() - 365);

const initReceiptData = {
  show: false,
  propertyID: "",
  propertyName: "",
  invoiceID: "",
  amount: "",
  date: "",
  description: "",
  address: "",
};

const Overview = () => {
  const [statDates, setStatDates] = React.useState({
    start: formatDate(pastThirtyDays),
    end: formatDate(new Date()),
  });
  const [graphFilter, setGraphFilter] = React.useState({
    startDate: formatDate(pastYear),
    endDate: formatDate(new Date()),
    income_type: "income",
    duration_type: "monthly",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [receipt, setReceipt] = React.useState(initReceiptData);
  const { role, avatar, firstName, lastName, number, email, address } =
    useAppSelector((state) => state.user);

  // API Hooks
  const {
    run: runFetchTransactions,
    data: fetchTransactionsResponse,
    requestStatus: fetchTransactionsStatus,
    error: fetchTransactionsError,
  } = useApiRequest({});
  const {
    run: runFetchStats,
    data: fetchStatsResponse,
    requestStatus: fetchStatsStatus,
    error: fetchStatsError,
  } = useApiRequest({});
  const {
    run: runRead,
    data: readResponse,
    requestStatus: readStatus,
    error: readError,
  } = useApiRequest({});
  const {
    run: runGraph,
    data: graphResponse,
    requestStatus: graphStatus,
    error: graphError,
  } = useApiRequest({});

  const fetchTransactions = () =>
    runFetchTransactions(fetchTransactionsService({ page: 1, limit: 10 }));

  const fetchStats = (start?, end?) => {
    runFetchStats(
      fetchStatService({
        start_date: start ?? statDates.start,
        end_date: end ?? statDates.end,
      })
    );
  };

  const fetchGraph = ({
    start,
    end,
    incomeType,
    durationType,
  }: {
    start?;
    end?;
    incomeType?;
    durationType?;
  }) =>
    runGraph(
      fetchGraphService({
        start_date: start ?? graphFilter.startDate,
        end_date: end ?? graphFilter.endDate,
        income_type: incomeType ?? graphFilter.income_type,
        duration_type: durationType ?? graphFilter.duration_type,
      })
    );

  React.useEffect(() => {
    fetchTransactions();
    fetchStats();
    fetchGraph({});
  }, []);

  const transactions = React.useMemo<TransactionTableItem[]>(() => {
    if (fetchTransactionsResponse) {
      if (fetchTransactionsResponse.status === 200) {
        return fetchTransactionsResponse.data.results.map((item) => ({
          propertyID: item.property_id,
          propertyName: item.property_name,
          invoiceID: `#${item.reference}`,
          amount: `NGN ${item.amount.toLocaleString()}`,
          date: new Date(item.created_at).toLocaleDateString(),
          description: item.description,
          address: item.address,
        }));
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Sorry",
            text: getErrorMessage({
              error: fetchTransactionsError ?? fetchTransactionsResponse,
              message: "Failed to fetch transactions, please try again later",
            }),
            type: false,
          })
        );
      }
    }
    return [];
  }, [fetchTransactionsResponse, fetchTransactionsError]);

  const stats = React.useMemo<StatInfo[]>(() => {
    if (fetchStatsResponse?.status === 200) {
      const stat = fetchStatsResponse.data.props;

      if (!stat) return [];

      return [
        {
          title: "Total Listing",
          total: stat.total_listing,
          percentage: Math.abs(stat.percentage_change_listing),
          increase: stat.percentage_change_listing > 0,
          difference: Math.abs(stat.change_listing),
        },
        {
          title: "Total Closing",
          total: stat.total_closing,
          percentage: Math.abs(stat.percentage_change_closing),
          increase: stat.percentage_change_closing > 0,
          difference: Math.abs(stat.change_closing),
        },
        {
          title: "Total Active",
          total: stat.total_active,
          percentage: Math.abs(stat.percentage_change_active),
          increase: stat.percentage_change_active > 0,
          difference: Math.abs(stat.change_active),
        },
        {
          title: "Total Inactive",
          total: stat.total_inactive,
          percentage: Math.abs(stat.percentage_change_inactive),
          increase: stat.percentage_change_inactive > 0,
          difference: Math.abs(stat.change_inactive),
        },
      ];
    } else if (fetchStatsError) {
      dispatch(
        updateToast({
          show: true,
          heading: "Sorry",
          text: getErrorMessage({
            error: fetchStatsError,
            message: "Failed to fetch stats, please try again later",
          }),
          type: false,
        })
      );
    }

    return [];
  }, [fetchStatsResponse, fetchStatsError]);

  const activity = React.useMemo<ActivityData[]>(() => {
    if (fetchStatsResponse?.status === 200) {
      const activities = fetchStatsResponse.data.activities;

      return activities.map((item) => ({
        date: timeAgo(new Date(item.date)),
        message: item.message,
        id: item.id,
      }));
    } else if (fetchStatsError) {
      dispatch(
        updateToast({
          show: true,
          heading: "Sorry",
          text: getErrorMessage({
            error: fetchStatsError,
            message: "Failed to fetch activity, please try again later",
          }),
          type: false,
        })
      );
    }

    return [];
  }, [fetchStatsResponse, fetchStatsError]);

  React.useMemo(() => {
    if (readResponse?.status === 204) {
      fetchStats();
    } else if (readError) {
      dispatch(
        updateToast({
          show: true,
          heading: "Sorry",
          text: getErrorMessage({
            error: readError,
            message: "Failed to clear activity, please try again later",
          }),
          type: false,
        })
      );
    }

    return [];
  }, [readResponse, readError]);

  const earningTrend = React.useMemo<EarningTrendsData>(() => {
    if (graphResponse?.status === 200) {
      return {
        totalEarning: graphResponse.data.total_earning ?? 0,
        avgIncome: graphResponse.data.average_earning ?? 0,
        graph:
          graphResponse.data.chart.length > 0
            ? graphResponse.data.chart.map((item) => ({
                label: `${item.month ? months[item.month - 1] : ""} ${
                  item.year
                }`,
                value: item.total_amount,
              }))
            : months.map((item) => ({
                label: item,
                value: 0,
              })),
      };
    } else if (graphError) {
      dispatch(
        updateToast({
          show: true,
          heading: "Sorry",
          text: getErrorMessage({
            error: graphError,
            message: "Failed to fetch earning trends, please try again later",
          }),
          type: false,
        })
      );
    }

    return {
      totalEarning: 0,
      avgIncome: 0,
      graph: [],
    };
  }, [graphResponse, graphError]);

  const handleStatFilter = (start, end) => {
    const formattedStart = formatDate(start);
    const formattedEnd = formatDate(end);
    setStatDates({ start: formattedStart, end: formattedEnd });
    fetchStats(formattedStart, formattedEnd);
  };

  const handleGraphDatesFilter = (start, end) => {
    const formattedStart = formatDate(start);
    const formattedEnd = formatDate(end);
    setGraphFilter((prev) => ({
      ...prev,
      startDate: formattedStart,
      endDate: formattedEnd,
    }));
    fetchGraph({ start: formattedStart, end: formattedEnd });
  };

  const handleGraphEarningFilter = (earning) => {
    setGraphFilter((prev) => ({
      ...prev,
      income_type: earning,
    }));
    fetchGraph({ incomeType: earning });
  };

  const handleGraphDurationFilter = (duration) => {
    setGraphFilter((prev) => ({
      ...prev,
      duration_type: duration,
    }));
    fetchGraph({ durationType: duration });
  };

  const handleRemoveActivity = (id) => runRead(markAsReadService(id));

  const handleViewProperty = (id) => navigate(Routes.propertyID(id));

  const showLoader =
    fetchTransactionsStatus.isPending ||
    fetchStatsStatus.isPending ||
    readStatus.isPending ||
    graphStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <ReceiptModal
        user={{
          address,
          number,
          name: `${firstName} ${lastName}`,
          email,
        }}
        {...receipt}
        close={() => setReceipt({ ...initReceiptData })}
      />

      <OverviewUI
        transactions={transactions}
        handleViewProperty={handleViewProperty}
        isAgent={role === "agent"}
        name={firstName}
        avatar={avatar}
        stats={stats}
        activity={activity}
        handleRemoveActivity={handleRemoveActivity}
        statDateFilter={{
          start: statDates.start,
          end: statDates.end,
          onChange: handleStatFilter,
        }}
        graphDateFilter={{
          start: graphFilter.startDate,
          end: graphFilter.endDate,
          onChange: handleGraphDatesFilter,
        }}
        graphEarningFilter={{
          value: graphFilter.income_type,
          onChange: handleGraphEarningFilter,
        }}
        graphDurationFilter={{
          value: graphFilter.duration_type,
          onChange: handleGraphDurationFilter,
        }}
        earningTrend={earningTrend}
        handleReceipt={(data: TransactionTableItem) =>
          setReceipt({ ...data, show: true })
        }
      />
    </>
  );
};

export { Overview };
