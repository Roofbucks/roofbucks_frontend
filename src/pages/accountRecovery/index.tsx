import * as React from "react";
import { Preloader, RecoveryModalUI, ResetPasswordModalUI } from "components";
import { ModalProps } from "types";
import { useApiRequest } from "hooks";
import { useAppDispatch } from "redux/hooks";
import { updateToast } from "redux/actions";
import { Routes } from "router";
import { useNavigate } from "react-router-dom";
import { resetPasswordService } from "api";
import { getErrorMessage } from "helpers";

interface RecoveryProps extends ModalProps {
  login;
}

const RecoveryModal: React.FC<RecoveryProps> = ({
  show,
  closeModal,
  login,
}) => {
  const dispatch = useAppDispatch();
  const [clear, setClear] = React.useState(false);

  const {
    run: runReset,
    data: resetResponse,
    requestStatus,
    error,
  } = useApiRequest({});

  React.useMemo(() => {
    if (resetResponse) {
      if (resetResponse.status === 200) {
        dispatch(
          updateToast({
            show: true,
            heading: "Great!",
            text: "If you have an account with us, a link to reset your password has been sent to your email",
            type: true,
          })
        );

        setClear(!clear);
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Sorry",
            text: getErrorMessage({
              error: error ?? resetResponse,
              message:
                "Failed to request for a password reset, please try again later",
            }),
            type: false,
          })
        );
      }
    }
  }, [resetResponse, error]);

  const handleForgotPassword = (email) => {
    runReset(
      resetPasswordService({
        email,
        redirect_url: `${window.location.origin}${Routes.recovery}`,
      })
    );
  };

  const showLoader = requestStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <RecoveryModalUI
        show={show}
        closeModal={closeModal}
        recovery={(data) => handleForgotPassword(data.email)}
        login={login}
        clear={clear}
      />
    </>
  );
};

export { RecoveryModal };
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
