import * as React from "react";
import { BusinessFormData, BusinessFormUI, Preloader } from "components";
import { useApiRequest } from "hooks";
import { useAppDispatch } from "redux/hooks";
import { addBusinessService, verifyCompanyService } from "api";
import { updateToast } from "redux/actions";
import { getErrorMessage } from "helpers";

interface BusinessFormProps {
  onSuccess: () => void;
}

const BusinessForm: React.FC<BusinessFormProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();
  const [verification, setVerification] = React.useState({
    isVerified: false,
    refNo: "",
  });

  const {
    run: runVerify,
    data: verifyResponse,
    requestStatus: verifyStatus,
    error: verifyError,
  } = useApiRequest({});

  const {
    run: runCreate,
    data: createResponse,
    requestStatus: createStatus,
    error: createError,
  } = useApiRequest({});

  const createBusiness = (data: FormData) => {
    data.append("reference_number", verification.refNo);
    runCreate(addBusinessService(data));
  };

  const verifyBusiness = (data) => {
    runVerify(verifyCompanyService(data));
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

  React.useMemo(() => {
    if (verifyResponse || verifyError) {
      if (verifyResponse.status === 200) {
        //   success
        setVerification({
          isVerified: true,
          refNo: verifyResponse.data.reference_number,
        });

        dispatch(
          updateToast({
            show: true,
            heading: "Company verification successful. ",
            text: "Please proceed with the rest of the form to create your business.",
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
        }, 2500);
      } else {
        //   error

        setVerification({ ...verification, isVerified: false });

        dispatch(
          updateToast({
            show: true,
            heading: "Error",
            text: getErrorMessage({
              error: verifyError ?? verifyResponse,
              message:
                "Unable to verify business. Please check the company name and  try again.",
            }),
            type: false,
          })
        );
      }
    }
  }, [verifyResponse, verifyError]);

  const showLoader = verifyStatus.isPending || createStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <BusinessFormUI
        submit={createBusiness}
        verifyBusiness={verifyBusiness}
        isVerified={verification.isVerified}
      />
    </>
  );
};

export { BusinessForm };
