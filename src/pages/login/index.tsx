import * as React from "react";
import { LoginModalUI } from "components";
import { ModalProps } from "types";

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
  return (
    <>
      <LoginModalUI
        show={show}
        closeModal={closeModal}
        login={(data) => console.log(data)}
        forgotPassword={forgot}
        signup={signup}
      />
    </>
  );
};

export { LoginModal };
