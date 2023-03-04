import { ProfileSetupUI } from "components";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BillingForm } from "./billing";
import { BusinessForm } from "./business";
import { PersonalForm } from "./personal";
import { Routes } from "router";

const ProfileSetup = () => {
  const [view, setView] = React.useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const isBusiness = searchParams.get("business") !== null;
  const isBilling = searchParams.get("billing") !== null;
  const navigate = useNavigate();

  const viewMyProfile = () => {
    setSearchParams({ profile: "true" });
  };

  const viewMyBusiness = () => {
    setSearchParams({ business: "true" });
  };

  const viewBillings = () => {
    setSearchParams({ billing: "true" });
  };

  React.useEffect(() => {
    setView(isBusiness ? 2 : isBilling ? 3 : 1);
  }, [searchParams]);

  const goToDashBoard = () => {
    navigate(Routes.overview);
  };

  return (
    <>
      <ProfileSetupUI activeView={view}>
        {view === 1 ? (
          <PersonalForm onSuccess={viewMyBusiness} />
        ) : view === 2 ? (
          <BusinessForm onSuccess={viewBillings} />
        ) : view === 3 ? (
          <BillingForm onSuccess={goToDashBoard} />
        ) : (
          ""
        )}
      </ProfileSetupUI>
    </>
  );
};

export { ProfileSetup };
