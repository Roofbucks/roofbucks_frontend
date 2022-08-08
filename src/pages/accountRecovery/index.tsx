import * as React from "react";
import { RecoveryModalUI, ResetPasswordModalUI } from "components";
import { ModalProps } from "types";

interface RecoveryProps extends ModalProps {
  login;
}

const RecoveryModal: React.FC<RecoveryProps> = ({
  show,
  closeModal,
  login,
}) => {
  return (
    <>
      <RecoveryModalUI
        show={show}
        closeModal={closeModal}
        recovery={(data) => console.log(data)}
        login={login}
      />
    </>
  );
};

export { RecoveryModal };
