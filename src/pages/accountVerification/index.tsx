import * as React from "react";
import { VerificationModalUI } from "components";
import { ModalProps } from "types";

interface VerificationProps extends ModalProps {
  login;
}

const VerificationModal: React.FC<VerificationProps> = ({
  show,
  closeModal,
  login,
}) => {
  return (
    <>
      <VerificationModalUI
        show={show}
        closeModal={closeModal}
        submit={(data) => console.log(data)}
        login={login}
        resendEmail={() => {}}
      />
    </>
  );
};

export { VerificationModal };
