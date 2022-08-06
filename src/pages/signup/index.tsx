import * as React from "react";
import { SignupModalUI } from "components";
import { ModalProps } from "types";


const SignupModal: React.FC<ModalProps> = ({ show, closeModal }) => {
  return (
    <>
      <SignupModalUI
        show={show}
        closeModal={closeModal}
        signup={(data) => console.log(data)}
      />
    </>
  );
};

export { SignupModal };
