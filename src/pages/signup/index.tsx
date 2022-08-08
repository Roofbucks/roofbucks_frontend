import * as React from "react";
import { SignupModalUI } from "components";
import { ModalProps } from "types";

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
  return (
    <>
      <SignupModalUI
        show={show}
        closeModal={closeModal}
        signup={(data) => console.log(data)}
        login={login}
        closeMobileNav={closeMobileNav}
      />
    </>
  );
};

export { SignupModal };
