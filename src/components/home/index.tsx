import { Button } from "components";
import * as React from "react";
import { HeroSection } from "./hero";
import { SellAndOwn } from "./sellAndOwn";
import { Services } from "./services";
import styles from "./styles.module.css";

const HomeUI = () => {
  return (
    <>
      <HeroSection />
      <Services />
      <SellAndOwn />
    </>
  );
};
export { HomeUI };
