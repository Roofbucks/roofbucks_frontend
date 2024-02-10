import { fetchOverviewService, fetchTransactionsService } from "api";
import { OverviewUI, Preloader, TransactionTableItem } from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { updateToast } from "redux/actions";
import { useAppDispatch } from "redux/hooks";
import { Routes } from "router";

const Overview = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const fetchTransactions = () =>
    runFetchTransactions(fetchTransactionsService({ page: 1, limit: 10 }));

    const fetchStats = () => {
      runFetchStats(fetchOverviewService())
    }

  React.useEffect(() => {
    fetchTransactions();
    fetchStats()
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

  const handleViewProperty = (id) => navigate(Routes.propertyID(id));

  const showLoader = fetchTransactionsStatus.isPending || fetchStatsStatus.isPending;
  return (
    <>
      <Preloader loading={showLoader} />
      <OverviewUI
        transactions={transactions}
        handleViewProperty={handleViewProperty}
      />
    </>
  );
};

export { Overview };
