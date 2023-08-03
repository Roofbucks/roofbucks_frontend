import { Button } from "components";
import * as React from "react";
import styles from "./styles.module.css";

interface GetStartedProps {
  className?: string;
  handleClick: () => void;
}

export const GetStartedBtn = ({ className, handleClick }: GetStartedProps) => {
  return (
    <Button
      className={`${styles.btn} ${className}`}
      type="primary"
      onClick={handleClick}
    >
      Get Started
    </Button>
  );
};

interface HomeProps {
  handleSignup: () => void;
}

const HeroSection: React.FC<HomeProps> = ({ handleSignup }) => {
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
          <GetStartedBtn handleClick={handleSignup} />
        </div>
      </section>
    </>
  );
};
export { HeroSection };
