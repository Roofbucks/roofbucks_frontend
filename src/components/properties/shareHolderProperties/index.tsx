import * as React from "react";
import styles from "./styles.module.css";
import {
  ActivityList,
  AmenityProp,
  Dropdown,
  DropdownListItem,
  PropertyCard,
  PropertyCardData,
  PropertyCardProps,
} from "components/generalComponents";
import { property3, EmptyStreet } from "assets";

interface ShareHolderPropertiesProps {
  handleSellShares: (id) => void;
  handleView: (id) => void;
  handleBuyBack: (id) => void;
  handlePayRent: (id) => void;
}

const ShareHolderPropertiesUI: React.FC<ShareHolderPropertiesProps> = ({
  handleSellShares,
  handleView,
  handleBuyBack,
  handlePayRent,
}) => {
  const property: PropertyCardData = {
    address: "256, Bayajida Close. LA. Nigeria",
    name: "Two Bedroom Apartmentpartmentttt",
    amount: "$10,000",
    owner: "By Bear Properties",
    images: [property3],
    amenities: { bedroom: 15, toilet: 21 },

    id: "",
  };

  const properties: PropertyCardProps[] = new Array(6).fill(property);

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
                primaryBtn={{
                  text: "Sell shares",
                  action: handleSellShares,
                  className: styles.pryBtn,
                }}
                moreDetails={handleView}
                type="row"
                size="normal"
                secondaryAction={
                  <Dropdown
                    dropdownListClassName={styles.dropdown}
                    type={"text"}
                    active="More"
                  >
                    <DropdownListItem
                      onDropdownChange={() => handleBuyBack(item.id)}
                      className={styles.dropdownListItem}
                    >
                      Buy back
                    </DropdownListItem>
                    <DropdownListItem
                      onDropdownChange={() => handlePayRent(item.id)}
                      className={styles.dropdownListItem}
                    >
                      Pay rent
                    </DropdownListItem>
                  </Dropdown>
                }
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
