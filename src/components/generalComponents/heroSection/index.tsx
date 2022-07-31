import * as React from "react";
import styles from "./styles.module.css";

const HeroSection = () => {
  return (
    <section className={styles.heroBg}>
      <div className={`appContainer ${styles.hero}`}>
        <h1 className={styles.ttl}>Property Listing</h1>
        <p className={styles.txt}>
          Lörem ipsum kunade hypokrott och sos underturism för lyngar anter i
          jasminmöte. Depode varen till ydist: i desa transponder var sedan
          ultravis. Klämspärr plast spesavis filvärd, gps-väst liksom dumurat,
          hobbyepidemiolog. Plamissa elektrometer deläskap oded, aren
          robotjournalistik danseoke.
        </p>
      </div>
    </section>
  );
};

export { HeroSection };
