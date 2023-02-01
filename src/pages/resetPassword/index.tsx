import * as React from "react";
import { Preloader, ResetPasswordModalUI } from "components";
import { ModalProps } from "types";
import { useAppDispatch } from "redux/hooks";
import { useApiRequest } from "hooks";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateToast } from "redux/actions";
import { Routes } from "router";
import { getErrorMessage, queryObject } from "helpers";
import { newPasswordService } from "api";

interface ResetProps extends ModalProps {
  login;
}

const ResetPasswordModal: React.FC<ResetProps> = ({
  show,
  closeModal,
  login,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  const params = queryObject(search);
  console.log(params);

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
            heading: "Great",
            text: "You've successfully reset your password. Redirecting to login in 3..2..1..",
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
          navigate(Routes.login);
        }, 2000);
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Sorry",
            text: getErrorMessage({
              error: error ?? resetResponse,
              message: "Password reset failed, please try again later",
            }),
            type: false,
          })
        );
      }
    }
  }, [resetResponse, error]);

  const showLoader = requestStatus.isPending;

  const resetPassword = (password: string) => {
    runReset(
      newPasswordService({
        uid64: params.uid64,
        token: params.token,
        password,
      })
    );
  };

  return (
    <>
      <Preloader loading={showLoader} />
      <ResetPasswordModalUI
        show={show}
        closeModal={closeModal}
        reset={(data) => resetPassword(data.password)}
        login={login}
      />
    </>
  );
};

export { ResetPasswordModal };
