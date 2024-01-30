import { fetchTransactionsService } from "api/services/finance";
import {
  FinancesUI,
  Pagination,
  PropertyTableItem,
  TransactionTableItem,
} from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { updateToast } from "redux/actions";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Routes } from "router";

const Finances = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [pages, setPages] = React.useState({
    total: 1,
    current: 1,
  });

  // API Hooks
  const {
    run: runFetch,
    data: fetchResponse,
    requestStatus: fetchStatus,
    error: fetchError,
  } = useApiRequest({});

  const fetchTransactions = (page?) =>
    runFetch(
      fetchTransactionsService({ page: page ?? pages.current, limit: 12 })
    );

  React.useEffect(() => {
    fetchTransactions(1);
  }, []);

  const transactions = React.useMemo<TransactionTableItem[]>(() => {
    if (fetchResponse) {
      if (fetchResponse.status === 200) {
        setPages({
          ...pages,
          total: fetchResponse.data.pages,
        });

        return fetchResponse.data.results.map((item) => ({
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
              error: fetchError ?? fetchResponse,
              message: "Failed to fetch transactions, please try again later",
            }),
            type: false,
          })
        );
      }
    }
    return [];
  }, [fetchResponse, fetchError]);

  const handlePageChange = (x: number) => {
    fetchTransactions(x);
    setPages({ ...pages, current: x });
  };

  const getCount = () => {
    let start = 0;
    let end = 0;

    start = pages.current * 10 - 9;
    end = pages.current * 10;

    if (fetchResponse?.data?.total < end) {
      end = fetchResponse?.data?.total;
    }

    return { start, end };
  };

  const viewProperty = (id) => {
    navigate(Routes.propertyID(id), {
      state: {
        from: "finances",
        url: Routes.finances,
      },
    });
  };

  const showLoader = fetchStatus.isPending;

  return (
    <>
      <FinancesUI tableBodyItems={transactions} viewProperty={viewProperty} />
      <Pagination
        hide={transactions.length === 0 || showLoader}
        current={pages.current}
        total={pages.total}
        handleChange={handlePageChange}
        count={{
          ...getCount(),
          total: fetchResponse?.data?.total ?? 0,
        }}
        name="Transactions"
      />
    </>
  );
};

export { Finances };
