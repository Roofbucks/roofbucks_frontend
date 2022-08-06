import * as React from "react";
import { LoginModalUI } from "components";

export interface LoginProps {
  show: boolean;
  closeModal: () => void;
}

const LoginModal: React.FC<LoginProps> = ({ show, closeModal }) => {
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
