import { BuyBackModal } from "components";
import * as React from "react";
import { ModalProps } from "types";

const BuyBack: React.FC<ModalProps> = ({ show, closeModal }) => {
  return (
    <>
      <BuyBackModal
        submit={console.log}
        show={show}
        closeModal={closeModal}
      />
    </>
  );
};

export { BuyBack };
