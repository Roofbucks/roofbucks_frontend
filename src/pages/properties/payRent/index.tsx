import { PayRentModal } from "components";
import * as React from "react";
import { ModalProps } from "types";

const PayRent: React.FC<ModalProps> = ({ show, closeModal }) => {
  return (
    <>
      <PayRentModal
        submit={console.log}
        show={show}
        closeModal={closeModal}
      />
    </>
  );
};

export { PayRent };
