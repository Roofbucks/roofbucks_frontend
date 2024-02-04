import { buyBackService } from "api";
import { BuyBackModal } from "components";
import { useApiRequest } from "hooks";
import * as React from "react";
import { ModalProps } from "types";

interface Props extends ModalProps {
  propertyName: string;
  propertyId: string;
  percentageOwned: number;
  marketValue: number;
}

const BuyBack: React.FC<Props> = (props) => {
  const { propertyId } = props;

  const {
    run: runBuyback,
    data: buybackResponse,
    requestStatus: buybackStatus,
    error: buybackError,
  } = useApiRequest({});

  const handleBuyBack = () => {
    runBuyback(buyBackService(propertyId));
  };

  return (
    <>
      <BuyBackModal {...props} submit={console.log} />
    </>
  );
};

export { BuyBack };
