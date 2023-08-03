import * as React from "react";
import { HomeUI } from "components";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Home = () => {
  const navigate = useNavigate();

  const handleSignup = () => navigate(Routes.signup);
  const handleListing = () => navigate(Routes.listing);
  const handleMarketplace = () => navigate(Routes.marketplace);

  return (
    <>
      <HomeUI
        handleSignup={handleSignup}
        handleListing={handleListing}
        handleMarketplace={handleMarketplace}
      />
    </>
  );
};
export { Home };
