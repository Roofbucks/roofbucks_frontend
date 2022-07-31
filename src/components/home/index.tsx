import * as React from "react";
import { Dashboard } from "../generalComponents";
import { HeroSection } from "./hero";
import { HowItWorks } from "./howItWorks";
import { Property } from "./property";
import { SellAndOwn } from "./sellAndOwn";
import { Services } from "./services";
import styles from "./styles.module.css";

const HomeUI = () => {
  return (
    <>
      <HeroSection />
      <Services />
      <SellAndOwn />
      <Property />
      <Dashboard />
      <HowItWorks />
    </>
  );
};
export { HomeUI };
