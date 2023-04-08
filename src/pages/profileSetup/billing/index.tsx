import { addBillingService } from "api";
import { BillingFormUI, Preloader } from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import * as React from "react";
import { updateToast } from "redux/actions";
import { useAppDispatch } from "redux/hooks";

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
              message:
                "Unable to add billing information. Please try again",
            }),
            type: false,
          })
        );
      }
    }
  }, [createResponse, createError]);

  const showLoader = createStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <BillingFormUI submit={submit} />
    </>
  );
};

export { BillingForm };
