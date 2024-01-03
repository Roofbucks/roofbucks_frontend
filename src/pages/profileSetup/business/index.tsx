import * as React from "react";
import { BusinessFormUI, Preloader } from "components";
import { useApiRequest } from "hooks";
import { useAppDispatch } from "redux/hooks";
import { addBusinessService } from "api";
import { updateToast } from "redux/actions";
import { getErrorMessage } from "helpers";

interface BusinessFormProps {
  onSuccess: () => void;
}

const BusinessForm: React.FC<BusinessFormProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();

  // API Hooks
  const {
    run: runCreate,
    data: createResponse,
    requestStatus: createStatus,
    error: createError,
  } = useApiRequest({});

  const createBusiness = (data: FormData) => {
    runCreate(addBusinessService(data));
  };

  React.useMemo(() => {
    if (createResponse || createError) {
      if (createResponse?.status === 200) {
        //   success
        dispatch(
          updateToast({
            show: true,
            heading: "Great!",
            text: "You've successfully created your business",
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
        }, 1000);
      } else {
        //   error
        dispatch(
          updateToast({
            show: true,
            heading: "Error",
            text: getErrorMessage({
              error: createError ?? createResponse,
              message: "Unable to create business. Please try again later",
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
      <BusinessFormUI submit={createBusiness} />
    </>
  );
};

export { BusinessForm };
