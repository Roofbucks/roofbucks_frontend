import {
  CaretRight,
  property1,
  property2,
  property3,
  SearchIcon,
} from "assets";
import { HeroSection, PropertyCard, PropertyCardProps } from "components";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import styles from "./styles.module.css";

const ListingsUI = () => {
  const navigate = useNavigate();

  const filters = [
    {
      name: "Country",
      onClick: () => {},
    },
    {
      name: "Budget",
      onClick: () => {},
    },
    {
      name: "Training",
      onClick: () => {},
    },
    {
      name: "Apartment",
      onClick: () => {},
    },
    {
      name: "Bedroom",
      onClick: () => {},
    },
    {
      name: "Status",
      onClick: () => {},
    },
  ];

  const propertyImages: string[] = [
    property3,
    property2,
    property3,
    property1,
    property3,
    property3,
  ];

  const property: PropertyCardProps = {
    address: "256, Bayajida Close. LA. Nigeria",
    name: "Two Bedroom Apartmentpartmentttt",
    discount: "20% off",
    description: `Modern two-bedroom apartment in sought-after Ghana marries traditional
    SF charm with contemporary city living. Tall arching columns in the
    front of the roomy living area provide beauty....`,
    moreDetails: (id) => navigate(Routes.propertyID(id)),
    amount: "$10,000",
    owner: "By Bear Properties",
    images: propertyImages,
    id: "123",
    amenities: { bedroom: 5, toilet: 5 },
    type: "row",
    size: "large",
    primaryBtn: {
      text: "Sell shares",
      action: (id) => console.log(id),
    },
  };

  const topDeals: PropertyCardProps[] = new Array(4).fill(property);

  const list: PropertyCardProps = {
    address: "256, Bayajida Close. LA. Nigeria",
    name: "Two Bedroom Apartmentpartmentttt",
    discount: "20% off",
    moreDetails: (id) => navigate(Routes.propertyID(id)),
    amount: "$10,000",
    owner: "By Bear Properties",
    images: [property3],
    id: "123",
    amenities: { bedroom: 5, toilet: 5 },
    type: "column",
    size: "normal",
    primaryBtn: {
      text: "Sell shares",
      action: (id) => console.log(id),
    },
  };

  const listings: PropertyCardProps[] = new Array(12).fill(list);
  return (
    <>
      <HeroSection
        text={` Lörem ipsum kunade hypokrott och sos underturism för lyngar anter i
          jasminmöte. Depode varen till ydist: i desa transponder var sedan
          ultravis. Klämspärr plast spesavis filvärd, gps-väst liksom dumurat,
          hobbyepidemiolog. Plamissa elektrometer deläskap oded, aren
          robotjournalistik danseoke.`}
        title="Property Listing"
      />
      <section>
        <div className={`appContainer ${styles.topDeals}`}>
          <h2 className={styles.ttl}>Top Deals</h2>
          <div className={styles.propertyList}>
            {topDeals.map((item, index) => (
              <PropertyCard {...item} key={index} />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className={`appContainer ${styles.listings}`}>
          <div className={styles.searchAndFilter}>
            <div className={styles.searchWrap}>
              <SearchIcon />
              <input placeholder="Search by name" type={"text"} />
            </div>
            <div className={styles.filterWrap}>
              {filters.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={styles.filterItem}
                >
                  {item.name} <CaretRight />
                </button>
              ))}
              <button className={styles.resetBtn}>Reset</button>
            </div>
          </div>

          <div className={styles.propertyListings}>
            {listings.map((item, index) => (
              <PropertyCard {...item} key={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export { ListingsUI };
