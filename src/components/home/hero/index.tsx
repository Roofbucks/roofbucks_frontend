import { Button } from "components";
import * as React from "react";
import styles from "./styles.module.css";

export const GetStartedBtn = ({ className }: { className?: string }) => {
  return (
    <Button
      className={`${styles.btn} ${className}`}
      type="primary"
      onClick={() => {}}
    >
      Get Started
    </Button>
  );
};

const HeroSection = () => {
  return (
    <>
      <section className={styles.heroBg}>
        <div className={`appContainer ${styles.hero}`}>
          <p className={styles.label}>Create your wealth</p>
          <h1 className={styles.ttl}>
            Buy shares and co-own residential real estates.
          </h1>
          <p className={styles.txt}>
            Roofbucks, gives you access to shares of homes across Africa. Best
            way to own a second home.
          </p>
          <GetStartedBtn />
        </div>
      </section>
    </>
  );
};
export { HeroSection };
