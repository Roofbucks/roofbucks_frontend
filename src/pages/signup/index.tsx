import * as React from "react";
import { SignupModalUI } from "components";
import { ModalProps } from "types";

interface SignupProps extends ModalProps {
  login: () => void;
}

const SignupModal: React.FC<SignupProps> = ({ show, closeModal, login }) => {
  return (
    <>
      <SignupModalUI
        show={show}
        closeModal={closeModal}
        signup={(data) => console.log(data)}
        login={login}
      />
    </>
  );
};

export { SignupModal };
