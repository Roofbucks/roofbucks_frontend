import * as React from "react";
import { LoginModalUI, Preloader } from "components";
import { ModalProps } from "types";
import { useApiRequest, useGetUser } from "hooks";
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
  const { fetchUser } = useGetUser();

  const {
    run: runLogin,
    data: loginResponse,
    requestStatus,
    error,
  } = useApiRequest({});

  React.useMemo(() => {
    if (loginResponse || error) {
      if (loginResponse?.status === 200) {
        fetchUser();
        const data = loginResponse.data;
        const role = data.role.toLowerCase();
        const id = data.id;

        localStorage.setItem("roofbucksAccess", data.tokens.access);
        localStorage.setItem("roofbucksRefresh", data.tokens.refresh);
        localStorage.setItem("id", id);
        localStorage.setItem(
          "profileCompletion",
          JSON.stringify(loginResponse.data.stages_of_profile_completion)
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

          if (role === "agent") {
            const profileCompletion =
              loginResponse.data.stages_of_profile_completion;

            if (!profileCompletion.profile) {
              return navigate(Routes.profileSetup("?profile=true"));
            } else if (!profileCompletion.business) {
              return navigate(Routes.profileSetup("?business=true"));
            } else if (!profileCompletion.billing) {
              return navigate(Routes.profileSetup("?billing=true"));
            }
          } else if (role === "shareholder") {
            const profileCompletion =
              loginResponse.data.stages_of_profile_completion;

            if (!profileCompletion.profile) {
              return navigate(Routes.profileSetup("?profile=true"));
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
