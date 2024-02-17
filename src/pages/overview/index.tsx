import {
  fetchStatService,
  fetchTransactionsService,
  markAsReadService,
} from "api";
import {
  ActivityData,
  OverviewUI,
  Preloader,
  StatInfo,
  TransactionTableItem,
} from "components";
import { formatDate, getErrorMessage, timeAgo } from "helpers";
import { useApiRequest } from "hooks";
import * as React from "react";
import { setDatasets } from "react-chartjs-2/dist/utils";
import { useNavigate } from "react-router-dom";
import { updateToast } from "redux/actions";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Routes } from "router";

// Create a new Date object for today's date
let currentDate = new Date();
// Subtract 30 days from the current date
currentDate.setDate(currentDate.getDate() - 30);

const Overview = () => {
  const [statDates, setStatDates] = React.useState({
    start: formatDate(currentDate),
    end: formatDate(new Date()),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { role, firstName, avatar } = useAppSelector((state) => state.user);

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

  React.useEffect(() => {
    fetchTransactions();
    fetchStats();
  }, []);

  const transactions = React.useMemo<TransactionTableItem[]>(() => {
    if (fetchTransactionsResponse) {
      if (fetchTransactionsResponse.status === 200) {
        return fetchTransactionsResponse.data.results.map((item) => ({
          propertyID: item.property_id,
          propertyName: item.property_name,
          invoiceID: `#${item.reference}`,
          amount: item.amount,
          date: new Date(item.created_at).toLocaleDateString(),
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

  const stats = React.useMemo<
    | {
        listings: StatInfo;
        closing: StatInfo;
        active: StatInfo;
        inactive: StatInfo;
      }
    | undefined
  >(() => {
    if (fetchStatsResponse?.status === 200) {
      const stat = fetchStatsResponse.data.props;

      return {
        listings: {
          title: "",
          total: stat.total_listing,
          percentage: Math.abs(stat.percentage_change_listing),
          increase: stat.percentage_change_listing > 0,
          difference: Math.abs(stat.change_listing),
        },
        closing: {
          title: "",
          total: stat.total_closing,
          percentage: Math.abs(stat.percentage_change_closing),
          increase: stat.percentage_change_closing > 0,
          difference: Math.abs(stat.change_closing),
        },
        active: {
          title: "",
          total: stat.total_active,
          percentage: Math.abs(stat.percentage_change_active),
          increase: stat.percentage_change_active > 0,
          difference: Math.abs(stat.change_active),
        },
        inactive: {
          title: "",
          total: stat.total_inactive,
          percentage: Math.abs(stat.percentage_change_inactive),
          increase: stat.percentage_change_inactive > 0,
          difference: Math.abs(stat.change_inactive),
        },
      };
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

    return undefined;
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

  const handleStatFilter = (start, end) => {
    const formattedStart = formatDate(start);
    const formattedEnd = formatDate(end);
    setStatDates({ start: formattedStart, end: formattedEnd });
    fetchStats(formattedStart, formattedEnd);
  };

  const handleRemoveActivity = (id) => runRead(markAsReadService(id));

  React.useMemo<ActivityData[]>(() => {
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

  const handleViewProperty = (id) => navigate(Routes.propertyID(id));

  const showLoader =
    fetchTransactionsStatus.isPending ||
    fetchStatsStatus.isPending ||
    readStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      {stats ? (
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
        />
      ) : (
        ""
      )}
    </>
  );
};

export { Overview };
