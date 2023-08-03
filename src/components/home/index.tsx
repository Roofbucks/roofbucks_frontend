import * as React from "react";
import { Dashboard } from "../generalComponents";
import { HeroSection } from "./hero";
import { HowItWorks } from "./howItWorks";
import { Property } from "./property";
import { SellAndOwn } from "./sellAndOwn";
import { Services } from "./services";
import styles from "./styles.module.css";

interface HomeProps {
  handleSignup: () => void;
  handleListing: () => void;
  handleMarketplace: () => void;
}

const HomeUI: React.FC<HomeProps> = ({
  handleListing,
  handleMarketplace,
  handleSignup,
}) => {
  return (
    <>
      <HeroSection handleSignup={handleSignup} />
      <Services
        handleListing={handleListing}
        handleSignup={handleSignup}
        handleMarketplace={handleMarketplace}
      />
      <SellAndOwn />
      <Property handleSignup={handleSignup} />
      <Dashboard handleSignup={handleSignup} />
      <HowItWorks />
    </>
  );
};
export { HomeUI };
