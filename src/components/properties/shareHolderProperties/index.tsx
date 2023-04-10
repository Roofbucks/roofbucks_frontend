import * as React from "react";
import styles from "./styles.module.css";
import {
  ActivityList,
  AmenityProp,
  PropertyCard,
  PropertyCardProps,
} from "components/generalComponents";
import { property3, EmptyStreet } from "assets";

const property: PropertyCardProps = {
  address: "256, Bayajida Close. LA. Nigeria",
  name: "Two Bedroom Apartmentpartmentttt",
  moreDetails: (id) => console.log(id),
  amount: "$10,000",
  owner: "By Bear Properties",
  images: [property3],
  amenities: { bedroom: 15, toilet: 21 },
  type: "row",
  size: "normal",
  primaryBtn: {
    text: "Sell shares",
    action: (id) => console.log(id),
    className: styles.pryBtn,
  },
  secondaryBtn: {
    text: "More",
    action: (id) => console.log(id),
    className: styles.secBtn,
  },
  id: "",
};

const properties: PropertyCardProps[] = new Array(6).fill(property);

const ShareHolderPropertiesUI = () => {
  return (
    <>
      <h1 className={styles.ttl}>Properties</h1>
      <section className={styles.container}>
        <div className={styles.propertyList}>
          {properties.length > 0 ? (
            properties.map((item, index) => (
              <PropertyCard
                {...item}
                key={index}
                className={styles.propertyCard}
              />
            ))
          ) : (
            <EmptyProperties />
          )}
        </div>
        <ActivityList className={styles.activity} />
      </section>
    </>
  );
};

const EmptyProperties = () => {
  return (
    <div className={styles.emptySec}>
      <EmptyStreet />
      <p>You don't have any properties</p>
    </div>
  );
};

export { ShareHolderPropertiesUI };
