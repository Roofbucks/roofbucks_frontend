import { addBillingService, fetchBanksService } from "api";
import { BillingFormUI, Preloader } from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import * as React from "react";
import { updateToast } from "redux/actions";
import { useAppDispatch } from "redux/hooks";
import { optionType } from "types";

interface BusinessFormProps {
  onSuccess: () => void;
}

const BillingForm: React.FC<BusinessFormProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();

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

  React.useEffect(() => {
    fetchBanks();
  }, []);

  const submit = (data) => {
    runCreate(addBillingService(data));
  };

  React.useMemo(() => {
    if (createResponse || createError) {
      if (createResponse?.status === 200) {
        //   success
        dispatch(
          updateToast({
            show: true,
            heading: "Account setup complete!",
            text: "You've successfully add a billing information. Redirecting to the dashboard in 3...2..1..",
            type: true,
          })
        );
        setTimeout(() => {
          dispatch(
            updateToast({
              show: false,
              heading: "",
              text: "",
              type: true,
            })
          );
          onSuccess();
        }, 2000);
      } else {
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
    }
  }, [createResponse, createError]);

  const banks = React.useMemo<optionType[]>(() => {
    if (banksResponse || createError) {
      if (banksResponse?.status === 200) {
        return banksResponse.data.map((item) => ({
          label: item.name,
          value: item.name
        }))
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Error",
            text: getErrorMessage({
              error: createError ?? createResponse,
              message: "Unable to fetch banks, please contact support",
            }),
            type: false,
          })
        );
      }
    }
    return []
  }, [createResponse, createError]);


  const showLoader = createStatus.isPending || banksStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <BillingFormUI submit={submit} banks={banks} />
    </>
  );
};

export { BillingForm };
