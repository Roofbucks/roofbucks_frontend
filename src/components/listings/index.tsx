import { HeroSection, PropertyCard } from "components";
import * as React from "react";
import styles from "./styles.module.css";

const ListingsUI = () => {
  return (
    <>
      <HeroSection />

      <section>
        <div className={`appContainer ${styles.topDeals}`}>
          <h2 className={styles.ttl}>Top Deals</h2>
          <div className={styles.propertyList} >
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
          </div>
        </div>
      </section>
    </>
  );
};

export { ListingsUI };
