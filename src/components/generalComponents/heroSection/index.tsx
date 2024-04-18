import * as React from "react";
import styles from "./styles.module.css";

interface HeroProps {
  title: string;
  text?: string;
}

const HeroSection: React.FC<HeroProps> = ({ text, title }) => {
  return (
    <section className={styles.heroBg}>
      <div data-aos="slide-up" className={`appContainer ${styles.hero}`}>
        <h1 className={styles.ttl}>{title}</h1>
        {text ? <p className={styles.txt}>{text}</p> : ""}
      </div>
    </section>
  );
};

export { HeroSection };
