import * as React from "react";
import { Preloader, VerificationModalUI } from "components";
import { ModalProps } from "types";
import { useLocation, useSearchParams } from "react-router-dom";
import { getErrorMessage, queryObject } from "helpers";
import { useApiRequest } from "hooks";
import { resendVerificationService, signupVerificationService } from "api";
import { useAppDispatch } from "redux/hooks";
import { updateToast } from "redux/actions";

interface VerificationProps extends ModalProps {
  signup: () => void;
  login: () => void;
}

const VerificationModal: React.FC<VerificationProps> = ({
  show,
  closeModal,
  signup,
  login,
}) => {
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = queryObject(search);

  const {
    run: runVerification,
    data: verificationResponse,
    requestStatus: verificationStatus,
    error: verificationError,
  } = useApiRequest({});

  const {
    run: runResend,
    data: resendResponse,
    requestStatus: resendStatus,
    error: resendError,
  } = useApiRequest({});

  React.useEffect(() => {
    if (params.otp && params.otp.length === 6) {
      runVerification(
        signupVerificationService({ email: params.email, token: params.otp })
      );
    }
  }, [params.otp]);

  const verify = (data) => {
    runVerification(
      signupVerificationService({ email: params.email, token: data.code })
    );
  };

  const resendMail = () => {
    runResend(resendVerificationService({ email: params.email }));
  };

  React.useMemo(() => {
    if (verificationResponse) {
      if (verificationResponse.status === 200) {
        dispatch(
          updateToast({
            show: true,
            heading: "Great",
            text: "You have successfully verified your email. Redirecting to login in 3..2..1",
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
          closeModal();
          searchParams.delete("email");
          searchParams.delete("verification");
          setSearchParams(searchParams);
          login();
        }, 2000);
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Sorry",
            text: getErrorMessage({
              error: verificationError ?? verificationResponse,
              message: "Email verification failed, please try again later",
            }),
            type: false,
          })
        );
      }
    }
  }, [verificationResponse, verificationError]);

  React.useMemo(() => {
    if (resendResponse) {
      if (resendResponse.status === 200) {
        dispatch(
          updateToast({
            show: true,
            heading: "Great",
            text: `A verification mail has been re-sent to ${params.email}`,
            type: true,
          })
        );
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Sorry",
            text: getErrorMessage({
              error: resendError ?? resendResponse,
              message: "Failed to re-send verification mail",
            }),
            type: false,
          })
        );
      }
    }
  }, [resendResponse, resendError]);

  const showLoader = verificationStatus.isPending || resendStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <VerificationModalUI
        show={show}
        closeModal={closeModal}
        submit={verify}
        signup={signup}
        resendEmail={resendMail}
        email={params.email}
      />
    </>
  );
};

export { VerificationModal };
