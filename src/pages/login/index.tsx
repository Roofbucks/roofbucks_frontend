import * as React from "react";
import { LoginModalUI, Preloader } from "components";
import { ModalProps } from "types";
import { useApiRequest } from "hooks";
import { loginService } from "api";
import { updateToast, updateUser } from "redux/actions";
import { useAppDispatch } from "redux/hooks";
import { Routes } from "router";
import { getErrorMessage } from "helpers";
import { useNavigate } from "react-router-dom";

interface LoginProps extends ModalProps {
  forgot: () => void;
  signup: () => void;
}

const LoginModal: React.FC<LoginProps> = ({
  show,
  closeModal,
  forgot,
  signup,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    run: runLogin,
    data: loginResponse,
    requestStatus,
    error,
  } = useApiRequest({});

  React.useMemo(() => {
    if (loginResponse) {
      if (loginResponse.status === 200) {
        localStorage.setItem(
          "roofbucksAccess",
          loginResponse.data.tokens.access
        );
        localStorage.setItem(
          "roofbucksRefresh",
          loginResponse.data.tokens.refresh
        );

        dispatch(
          updateUser({
            role: loginResponse.data.role === "AGENT" ? "agent" : "shareholder",
            firstName: loginResponse.data.firstname,
            lastName: loginResponse.data.lastname,
            email: loginResponse.data.email,
          })
        );
        dispatch(
          updateToast({
            show: true,
            heading: "Great",
            text: "Login successful",
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

          if (loginResponse.data.role === "AGENT") {
            const profileCompletion =
              loginResponse.data.stages_of_profile_completion;

            if (!profileCompletion.profile) {
              return navigate(Routes.profileSetup("?profile=true"));
            } else if (!profileCompletion.business) {
              return navigate(Routes.profileSetup("?business=true"));
            } else if (!profileCompletion.billing) {
              return navigate(Routes.profileSetup("?billing=true"));
            }
          }
          navigate(Routes.overview);
        }, 1000);
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Sorry",
            text: getErrorMessage({
              error: error ?? loginResponse,
              message: "Login failed, please try again later",
            }),
            type: false,
          })
        );
      }
    }
  }, [loginResponse, error]);

  const showLoader = requestStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <LoginModalUI
        show={show}
        closeModal={closeModal}
        login={(data) => runLogin(loginService(data))}
        forgotPassword={forgot}
        signup={signup}
      />
    </>
  );
};

export { LoginModal };
