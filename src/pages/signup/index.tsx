import * as React from "react";
import { Preloader, SignupData, SignupModalUI } from "components";
import { ModalProps } from "types";
import { useApiRequest } from "hooks";
import { signupService } from "api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";
import { updateToast } from "redux/actions";
import { getErrorMessage } from "helpers";

interface SignupProps extends ModalProps {
  login: () => void;
  closeMobileNav: () => void;
}

const SignupModal: React.FC<SignupProps> = ({
  show,
  closeModal,
  login,
  closeMobileNav,
}) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();

  const {
    run: runSignup,
    data: signupResponse,
    requestStatus,
    error,
  } = useApiRequest({});

  const redirectToVerification = () => {
    closeModal();
    navigate(`/?verification=true&email=${email}`);
  };

  const Signup = (data: SignupData) => {
    setEmail(data.email);
    runSignup(
      signupService({
        firstname: data.firstName,
        lastname: data.lastName,
        password: data.password,
        email: data.email,
        role: data.accountType.value === "agent" ? 1 : 0,
      })
    );
  };

  React.useMemo(() => {
    if (signupResponse || error) {
      if (signupResponse?.status === 201) {
        dispatch(
          updateToast({
            show: true,
            heading: "Great",
            text: "You have successfully signed up, please verify your email to complete your registration",
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
          redirectToVerification();
        }, 1500);
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Sorry",
            text: getErrorMessage({
              error: error ?? signupResponse,
              message: "Signup failed, please try again later",
            }),
            type: false,
          })
        );
      }
    }
  }, [signupResponse, error]);

  const showLoader = requestStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <SignupModalUI
        show={show}
        closeModal={closeModal}
        signup={Signup}
        login={login}
        closeMobileNav={closeMobileNav}
      />
    </>
  );
};

export { SignupModal };
