import {
  CaretRight,
  EmptyStreet,
  property1,
  property2,
  property3,
  SearchIcon,
} from "assets";
import {
  HeroSection,
  Pagination,
  PaginationProps,
  PropertyCard,
  PropertyCardData,
} from "components";
import styles from "./styles.module.css";

interface ListingsProps {
  properties: PropertyCardData[];
  pagination: PaginationProps;
  handleView: (id) => void;
  search: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  submitFilter: (data) => void;
}

const ListingsUI: React.FC<ListingsProps> = ({
  properties,
  pagination,
  search,
  handleView,
  submitFilter,
}) => {
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

  const property: PropertyCardData = {
    address: "256, Bayajida Close. LA. Nigeria",
    name: "Two Bedroom Apartmentpartmentttt",
    discount: "20% off",
    description: `Modern two-bedroom apartment in sought-after Ghana marries traditional
    SF charm with contemporary city living. Tall arching columns in the
    front of the roomy living area provide beauty....`,
    amount: "$10,000",
    owner: "By Bear Properties",
    images: propertyImages,
    id: "123",
    amenities: { bedroom: 5, toilet: 5 },
  };

  const topDeals: PropertyCardData[] = new Array(4).fill(property);

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
              <PropertyCard
                primaryBtn={{
                  text: "Sell shares",
                  action: (id) => console.log(id),
                }}
                type="row"
                size="large"
                moreDetails={handleView}
                {...item}
                key={index}
              />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className={`appContainer ${styles.listings}`}>
          <div className={styles.searchAndFilter}>
            <div className={styles.searchWrap}>
              <SearchIcon />
              <input
                value={search.value}
                onChange={search.onChange}
                placeholder="Search by name"
                type={"search"}
              />
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

          {properties.length > 0 ? (
            <div className={styles.propertyListings}>
              {properties.map((item, index) => (
                <PropertyCard
                  primaryBtn={{
                    text: "Sell shares",
                    action: (id) => console.log(id),
                  }}
                  type="column"
                  size="normal"
                  moreDetails={handleView}
                  {...item}
                  key={index}
                />
              ))}
              <Pagination {...pagination} />
            </div>
          ) : (
            <div className={styles.empty}>
              <EmptyStreet />
              <p>There are no properties at this time</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export { ListingsUI };
