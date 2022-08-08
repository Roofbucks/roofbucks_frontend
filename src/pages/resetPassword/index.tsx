import * as React from "react";
import { ResetPasswordModalUI } from "components";
import { ModalProps } from "types";

interface ResetProps extends ModalProps {
  login;
}

const ResetPasswordModal: React.FC<ResetProps> = ({
  show,
  closeModal,
  login,
}) => {
  return (
    <>
      <ResetPasswordModalUI
        show={show}
        closeModal={closeModal}
        reset={(data) => console.log(data)}
        login={login}
      />
    </>
  );
};

export { ResetPasswordModal };
