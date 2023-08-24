import { SellSharesModal } from "components";
import * as React from "react";
import { ModalProps } from "types";

const SellShares: React.FC<ModalProps> = ({ show, closeModal }) => {
  return (
    <>
      <SellSharesModal
        submit={console.log}
        show={show}
        closeModal={closeModal}
      />
    </>
  );
};

export { SellShares };
