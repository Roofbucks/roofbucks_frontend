import { fetchBanksService, addBankAccountService } from "api";
import { AddBankAccountUI, Preloader } from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { updateToast } from "redux/actions";
import { useAppDispatch } from "redux/hooks";
import { optionType } from "types";

interface Props {
  show: boolean;
  close: () => void;
  callback: () => void;
}

const AddBankAccount: React.FC<Props> = ({ show, close, callback }) => {
  const dispatch = useAppDispatch();
  const [clear, setClear] = useState(false);

  const {
    run: runCreate,
    data: createResponse,
    requestStatus: createStatus,
    error: createError,
  } = useApiRequest({});
  const {
    run: runBanks,
    data: banksResponse,
    requestStatus: banksStatus,
    error: banksError,
  } = useApiRequest({});

  const fetchBanks = () => runBanks(fetchBanksService());

  useEffect(() => {
    fetchBanks();
  }, []);

  const submit = (data) => {
    runCreate(addBankAccountService(data));
  };

  useMemo(() => {
    if (createResponse?.status === 200) {
      close();
      callback();
      setClear((prev) => !prev);
      dispatch(
        updateToast({
          show: true,
          heading: "You've added a new bank account!",
          text: "",
          type: true,
        })
      );
    } else if (createError) {
      //   error
      dispatch(
        updateToast({
          show: true,
          heading: "Error",
          text: getErrorMessage({
            error: createError ?? createResponse,
            message: "Unable to add billing information. Please try again",
          }),
          type: false,
        })
      );
    }
  }, [createResponse, createError]);

  const banks = useMemo<optionType[]>(() => {
    if (banksResponse || createError) {
      if (banksResponse?.status === 200) {
        return banksResponse.data.map((item) => ({
          label: item.name,
          value: item.name,
        }));
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Error",
            text: getErrorMessage({
              error: banksError ?? banksResponse,
              message: "Unable to fetch banks, please contact support",
            }),
            type: false,
          })
        );
      }
    }
    return [];
  }, [banksResponse, banksError]);

  const showLoader = createStatus.isPending || banksStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <AddBankAccountUI
        show={show}
        close={close}
        submit={submit}
        banks={banks}
        clear={clear}
      />
    </>
  );
};

export { AddBankAccount };
