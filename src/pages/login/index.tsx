import * as React from "react";
import { LoginModalUI } from "components";
import { ModalProps } from "types";

const LoginModal: React.FC<ModalProps> = ({ show, closeModal }) => {
  return (
    <>
      <LoginModalUI
        show={show}
        closeModal={closeModal}
        login={(data) => console.log(data)}
      />
    </>
  );
};

export { LoginModal };
