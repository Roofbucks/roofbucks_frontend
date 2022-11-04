import {
  BathRoomIcon,
  BedRoomIcon,
  CaretRight,
  FilterIcon,
  property1,
  property2,
  property3,
  SearchIcon,
} from "assets";
import {
  AmenityProp,
  Button,
  CustomSelect,
  HeroSection,
  PropertyCard,
  PropertyCardProps,
} from "components";
import * as React from "react";
import styles from "./styles.module.css";

const MarketplaceUI = () => {
  const [showFilter, setShowFilter] = React.useState(false);
  const [mobile, setMobile] = React.useState(
    window.innerWidth <= 800 ? true : false
  );
  const [filters, setFilters] = React.useState({
    propertyType: false,
    propertyStatus: false,
    propertyPrice: false,
    propertyLocation: false,
  });
  const propertyImages: string[] = [
    property3,
    property2,
    property3,
    property1,
    property3,
    property3,
  ];

  const amenities: AmenityProp[] = [
    {
      name: "Bedroom",
      Icon: BedRoomIcon,
      value: "3",
    },
    {
      name: "Bathroom",
      Icon: BathRoomIcon,
      value: "3",
    },
    {
      name: "Bedroom",
      Icon: BedRoomIcon,
      value: "3",
    },
  ];

  const property: PropertyCardProps = {
    address: "256, Bayajida Close. LA. Nigeria",
    name: "Two Bedroom Apartmentpartmentttt",
    discount: "20% off",
    moreDetails: (id) => console.log(id),
    buy: (id) => console.log(id),
    amount: "$10,000",
    owner: "By Bear Properties",
    images: propertyImages,
    amenities: amenities,
    type: "row",
    size: "normal",
  };

  const properties: PropertyCardProps[] = new Array(6).fill(property);

  const screenSizeUpdate = () => {
    if (window.innerWidth <= 800) {
      setMobile(true);
    } else if (window.innerWidth > 800) {
      setMobile(false);
    }
  };
  window.onresize = screenSizeUpdate;
  return (
    <>
      <HeroSection title="Marketplace" />
      <section className={`appContainer ${styles.welcome}`}>
        <h2 className={styles.ttl}>Welcome to The Marketplace</h2>
        <p className={styles.txt}>
          Lörem ipsum kunade hypokrott och sos underturism för lyngar anter i
          jasminmöte. Depode varen till ydist: i desa transponder var sedan
          ultravis. Klämspärr plast spesavis filvärd, gps-väst liksom dumurat,
          hobbyepidemiolog. Plamissa elektrometer deläskap oded, aren
          robotjournalistik danseoke.
        </p>
      </section>
      <section className={`appContainer ${styles.listings}`}>
        <div className={styles.searchWrap}>
          <FilterIcon
            onClick={() => setShowFilter(!showFilter)}
            role="button"
          />
          <div>
            <SearchIcon />
            <input placeholder="Search by name" type={"text"} />
          </div>
        </div>

        {(mobile && showFilter) || !mobile ? (
          <div className={styles.filterWrap}>
            <div className={styles.filterItem}>
              <div className={styles.filterHd}>
                <span>Property Type</span>{" "}
                <CaretRight
                  role={"button"}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      propertyType: !filters.propertyType,
                    })
                  }
                />
              </div>
              {filters.propertyType ? (
                <>
                  <div className={styles.filterCheck}>
                    <span>Residential</span>
                    <label>
                      <input type={"checkbox"} />
                      <span className={styles.mark}></span>
                    </label>
                  </div>
                  <div className={styles.filterCheck}>
                    <span>Single Family House</span>
                    <label>
                      <input type={"checkbox"} />
                      <span className={styles.mark}></span>
                    </label>
                  </div>
                  <div className={styles.filterCheck}>
                    <span>Hotel Apartment</span>
                    <label>
                      <input type={"checkbox"} />
                      <span className={styles.mark}></span>
                    </label>
                  </div>
                  <div className={styles.filterCheck}>
                    <span>Studio Apartment</span>
                    <label>
                      <input type={"checkbox"} />
                      <span className={styles.mark}></span>
                    </label>
                  </div>
                  <div className={styles.filterCheck}>
                    <span>Apart Complex</span>
                    <label>
                      <input type={"checkbox"} />
                      <span className={styles.mark}></span>
                    </label>
                  </div>
                  <div className={styles.filterCheck}>
                    <span>Town House</span>
                    <label>
                      <input type={"checkbox"} />
                      <span className={styles.mark}></span>
                    </label>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div className={styles.filterItem}>
              <div className={styles.filterHd}>
                <span>Property Status</span>{" "}
                <CaretRight
                  role={"button"}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      propertyStatus: !filters.propertyStatus,
                    })
                  }
                />
              </div>
              {filters.propertyStatus ? (
                <>
                  <div className={styles.filterCheck}>
                    <span>Completed</span>
                    <label>
                      <input type={"checkbox"} />
                      <span className={styles.mark}></span>
                    </label>
                  </div>
                  <div className={styles.filterCheck}>
                    <span>In-progress</span>
                    <label>
                      <input type={"checkbox"} />
                      <span className={styles.mark}></span>
                    </label>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div className={styles.filterItem}>
              <div className={styles.filterHd}>
                <span>Price</span>{" "}
                <CaretRight
                  role={"button"}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      propertyPrice: !filters.propertyPrice,
                    })
                  }
                />
              </div>
              {filters.propertyPrice ? (
                <div className={styles.priceWrap}>
                  <CustomSelect
                    onChange={() => {}}
                    validatorMessage={""}
                    name={"currency"}
                    placeholder={"Currency"}
                    label={""}
                    options={[
                      { label: "USD", value: "USD" },
                      { label: "GHC", value: "GHC" },
                      { label: "NGN", value: "NGN" },
                    ]}
                    value={{ label: "USD", value: "USD" }}
                    inputClass={styles.currencySelect}
                    parentClassName={styles.currencySelectWrap}
                  />
                  <div className={styles.minMax}>
                    <input placeholder="Min" /> to
                    <input placeholder="Max" />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={styles.filterItem}>
              <div className={styles.filterHd}>
                <span>Property Location</span>{" "}
                <CaretRight
                  role={"button"}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      propertyLocation: !filters.propertyLocation,
                    })
                  }
                />
              </div>
              {filters.propertyLocation ? (
                <div className={styles.locationWrap}>
                  <CustomSelect
                    onChange={() => {}}
                    validatorMessage={""}
                    name={"country"}
                    placeholder={"Country"}
                    label={""}
                    options={[
                      { label: "Nigeria", value: "Nigeria" },
                      { label: "Ghana", value: "Ghana" },
                    ]}
                    value={{ label: "Nigeria", value: "Nigeria" }}
                    inputClass={styles.countrySelect}
                    parentClassName={styles.countrySelectWrap}
                  />
                  <CustomSelect
                    onChange={() => {}}
                    validatorMessage={""}
                    name={"state"}
                    placeholder={"State"}
                    label={""}
                    options={[{ label: "Lagos", value: "Lagos" }]}
                    value={{ label: "Lagos", value: "Lagos" }}
                    inputClass={styles.stateSelect}
                    parentClassName={styles.stateSelectWrap}
                  />
                </div>
              ) : (
                ""
              )}
            </div>

            <div className={styles.btnSec}>
              <Button type={"primary"} onClick={() => {}}>
                Apply
              </Button>
              <Button type={"tertiary"} onClick={() => {}}>
                Clear
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className={styles.propertyList}>
          {properties.map((item, index) => (
            <PropertyCard {...item} key={index} className={styles.property} />
          ))}
        </div>
      </section>
    </>
  );
};

export { MarketplaceUI };
