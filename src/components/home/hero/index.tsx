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
          <p className={styles.label}>Own your Home</p>
          <h1 className={styles.ttl}>
            Split and Share the cost of buying your home with an investor.
          </h1>
          <p className={styles.txt}>
            Apply to get funded up to 50% on any property and then gradually
            save up to own 100% while you pay partial rent.
          </p>
          <GetStartedBtn handleClick={handleSignup} />
        </div>
      </section>
    </>
  );
};
export { HeroSection };
