import { ShareHolderPropertiesUI } from "components";
import * as React from "react";
import { SellShares } from "../sellShares";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { BuyBack } from "../buyBack";
import { PayRent } from "../payRent";

const ShareHolderProperties = () => {
  const navigate = useNavigate();
  const [sellShares, setSellShares] = React.useState(false);
  const [buyBack, setBuyBack] = React.useState(false);
  const [payRent, setPayRent] = React.useState(false);

  const handleView = (id) => {
    navigate(Routes.propertyID(id));
  };

  return (
    <>
      <SellShares show={sellShares} closeModal={() => setSellShares(false)} />
      <BuyBack show={buyBack} closeModal={() => setBuyBack(false)} />
      <PayRent show={payRent} closeModal={() => setPayRent(false)} />
      <ShareHolderPropertiesUI
        handleView={handleView}
        handleSellShares={() => setSellShares(true)}
        handleBuyBack={() => setBuyBack(true)}
        handlePayRent={() => setPayRent(true)}
      />
    </>
  );
};

export { ShareHolderProperties };
