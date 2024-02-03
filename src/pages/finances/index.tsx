import {
  fetchTransactionsService,
  fetchBankAccountsService,
  setPrimaryBankAccountService,
  deleteBankAccountService,
} from "api";
import {
  BankAccountData,
  ConfirmationModal,
  FinancesUI,
  Pagination,
  Preloader,
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
import { AddBankAccount } from "./addBankAccount";

const Finances = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [pages, setPages] = React.useState({
    total: 1,
    current: 1,
  });
  const [addBank, setAddBank] = React.useState(false);
  const [deleteBank, setDeleteBank] = React.useState({
    show: false,
    index: -1,
  });
  const [primaryBank, setPrimaryBank] = React.useState({
    show: false,
    index: -1,
  });

  // API Hooks
  const {
    run: runFetch,
    data: fetchResponse,
    requestStatus: fetchStatus,
    error: fetchError,
  } = useApiRequest({});
  const {
    run: runFetchBanks,
    data: fetchBanksResponse,
    requestStatus: fetchBanksStatus,
    error: fetchBanksError,
  } = useApiRequest({});
  const {
    run: runSetPrimary,
    data: setPrimaryResponse,
    requestStatus: setPrimaryStatus,
    error: setPrimaryError,
  } = useApiRequest({});
  const {
    run: runDeleteBank,
    data: deleteBankResponse,
    requestStatus: deleteBankStatus,
    error: deleteBankError,
  } = useApiRequest({});

  const fetchTransactions = (page?) =>
    runFetch(
      fetchTransactionsService({ page: page ?? pages.current, limit: 12 })
    );

  const fetchBankAccounts = () => {
    runFetchBanks(fetchBankAccountsService());
  };

  const handlePrimaryAccount = () => {
    runSetPrimary(setPrimaryBankAccountService(primaryBank.index));
  };

  const deleteBankAccount = () => {
    runDeleteBank(deleteBankAccountService(deleteBank.index));
  };

  React.useEffect(() => {
    fetchTransactions(1);
    fetchBankAccounts();
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

  const banks = React.useMemo<BankAccountData[]>(() => {
    if (fetchBanksResponse?.status === 200) {
      return fetchBanksResponse.data.bank.map((item, index) => ({
        name: item.account_name,
        bank: item.bank_name,
        number: item.account_number,
        active: index === 0,
      }));
    } else if (fetchBanksError) {
      dispatch(
        updateToast({
          show: true,
          heading: "Sorry",
          text: getErrorMessage({
            error: fetchBanksError ?? fetchBanksResponse,
            message: "Failed to fetch bank accounts, please try again later",
          }),
          type: false,
        })
      );
    }

    return [];
  }, [fetchBanksResponse, fetchBanksError]);

  React.useMemo(() => {
    if (setPrimaryResponse?.status === 200) {
      fetchBankAccounts();
      setPrimaryBank({ show: false, index: -1 });
      dispatch(
        updateToast({
          show: true,
          heading:
            setPrimaryResponse.data?.message ||
            "Successfully updated primary bank account!",
          text: "",
          type: true,
        })
      );
    } else if (setPrimaryError) {
      dispatch(
        updateToast({
          show: true,
          heading: "Sorry",
          text: getErrorMessage({
            error: setPrimaryError ?? setPrimaryResponse,
            message:
              "Failed to update primary bank account, please try again later",
          }),
          type: false,
        })
      );
    }

    return [];
  }, [setPrimaryResponse, setPrimaryError]);

  React.useMemo(() => {
    if (deleteBankResponse?.status === 200) {
      fetchBankAccounts();
      setDeleteBank({ show: false, index: -1 });
      dispatch(
        updateToast({
          show: true,
          heading:
            deleteBankResponse.data?.message ||
            "Successfully deleted bank account!",
          text: "",
          type: true,
        })
      );
    } else if (deleteBankError) {
      dispatch(
        updateToast({
          show: true,
          heading: "Sorry",
          text: getErrorMessage({
            error: deleteBankError ?? deleteBankResponse,
            message: "Failed to delete bank account, please try again later",
          }),
          type: false,
        })
      );
    }

    return [];
  }, [deleteBankResponse, deleteBankError]);

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

  const showLoader =
    fetchStatus.isPending ||
    fetchBanksStatus.isPending ||
    setPrimaryStatus.isPending ||
    deleteBankStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <AddBankAccount
        show={addBank}
        close={() => setAddBank(false)}
        callback={() => fetchBankAccounts()}
      />
      <ConfirmationModal
        show={deleteBank.show || primaryBank.show}
        close={() => {
          if (deleteBank.show) setDeleteBank({ show: false, index: -1 });
          else if (primaryBank.show) setPrimaryBank({ show: false, index: -1 });
        }}
        text={
          deleteBank.show
            ? "Are you sure you want to delete this bank account?"
            : primaryBank.show
            ? "Are you sure you want to make this bank account your primary account?"
            : ""
        }
        submit={() => {
          if (deleteBank.show) deleteBankAccount();
          else if (primaryBank.show) handlePrimaryAccount();
        }}
      />
      <FinancesUI
        accounts={banks}
        tableBodyItems={transactions}
        viewProperty={viewProperty}
        handleAddBank={() => setAddBank(true)}
        handlePrimaryBank={(index) => setPrimaryBank({ show: true, index })}
        handleDeleteBank={(index) => setDeleteBank({ show: true, index })}
      />
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
