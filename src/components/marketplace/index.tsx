import {
  CalendarIconOutline,
  CaretRight,
  EmptyStreet,
  FilterIcon,
  SearchIcon,
} from "assets";
import {
  Button,
  CustomSelect,
  HeroSection,
  Pagination,
  PaginationProps,
  PropertyCard,
  PropertyCardData,
} from "components";
import * as React from "react";
import styles from "./styles.module.css";
import { countryOptions, initialOptionType, propertyTypeOptions } from "utils";
import { optionType } from "types";

interface FilterValues {
  country: optionType;
  state: optionType;
  minPrice: string;
  maxPrice: string;
  type: optionType[];
  status: optionType;
}

interface MarketplaceProps {
  properties: PropertyCardData[];
  pagination: PaginationProps;
  handleView: (id) => void;
  handleConnect: (id) => void;
  search: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  submitFilter: (data) => void;
}

const MarketplaceUI: React.FC<MarketplaceProps> = ({
  pagination,
  properties,
  handleView,
  search,
  submitFilter,
  handleConnect,
}) => {
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

  const [filterValues, setFilterValues] = React.useState<FilterValues>({
    country: initialOptionType,
    state: initialOptionType,
    minPrice: "",
    maxPrice: "",
    type: [],
    status: initialOptionType,
  });

  const screenSizeUpdate = () => {
    if (window.innerWidth <= 800) {
      setMobile(true);
    } else if (window.innerWidth > 800) {
      setMobile(false);
    }
  };
  window.onresize = screenSizeUpdate;

  const handleTypeChange = (val: optionType) => {
    const index = filterValues.type.findIndex((object) => {
      return object.value === val.value;
    });

    if (index === -1) {
      const prevList = [...filterValues.type];
      setFilterValues({ ...filterValues, type: [val, ...prevList] });
    } else {
      handleRemoveType(val);
    }
  };

  const handleRemoveType = (val) => {
    const index = filterValues.type.findIndex((object) => {
      return object.value === val.value;
    });
    const prevList = [...filterValues.type];
    prevList.splice(index, 1);
    setFilterValues({ ...filterValues, type: [...prevList] });
  };

  const resetFilters = () => {
    setFilterValues({
      country: initialOptionType,
      state: initialOptionType,
      minPrice: "",
      maxPrice: "",
      type: [],
      status: initialOptionType,
    });
    submitFilter({});
  };

  const applyFilters = () => {
    const budget = `${filterValues.minPrice},${filterValues.maxPrice}`;
    const status = filterValues.status.value;
    const data = {
      country: filterValues.country.value,
      budget: budget === "," ? "" : budget,
      status: status === "all" ? "" : status,
      type: filterValues.type.map((item) => item.value).join(","),
    };

    submitFilter(data);
  };

  return (
    <>
      <HeroSection title="Marketplace" />
      <section className={`appContainer ${styles.welcome}`}>
        <h2 className={styles.ttl}>Welcome to The Marketplace</h2>
        <p className={styles.txt}>
          Discover amazing deals, connect to fund homes with ready home-buyers
          and start earning.
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
            <input
              value={search.value}
              onChange={search.onChange}
              placeholder="Search by name"
              type={"search"}
            />
          </div>
        </div>

        {(mobile && showFilter) || !mobile ? (
          <div className={styles.filterWrap}>
            <div className={styles.filterItem}>
              <div className={styles.filterHd}>
                <span>Property Type</span>
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
                  {propertyTypeOptions.map((item, index) => (
                    <div key={index} className={styles.filterCheck}>
                      <span>{item.label}</span>
                      <label>
                        <input
                          onChange={() => handleTypeChange(item)}
                          checked={
                            filterValues.type.filter(
                              (item2) => item.value === item2.value
                            ).length > 0
                          }
                          type={"checkbox"}
                        />
                        <span className={styles.mark}></span>
                      </label>
                    </div>
                  ))}
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
                  <CustomSelect
                    onChange={(val) =>
                      setFilterValues({ ...filterValues, status: val })
                    }
                    validatorMessage={""}
                    name={"status"}
                    placeholder={"Select status"}
                    label={""}
                    options={[
                      { label: "All", value: "all" },
                      { label: "Completed", value: "COMPLETED" },
                      { label: "In-progress", value: "IN-PROGRESS" },
                    ]}
                    value={filterValues.status}
                  />
                </>
              ) : (
                ""
              )}
            </div>
            <div className={styles.filterItem}>
              <div className={styles.filterHd}>
                <span>Price (NGN)</span>{" "}
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
                  <div className={styles.minMax}>
                    <input
                      onChange={(e) =>
                        setFilterValues({
                          ...filterValues,
                          minPrice: e.target.value,
                        })
                      }
                      value={filterValues.minPrice}
                      type="number"
                      placeholder="Min"
                    />
                    <span>to</span>
                    <input
                      onChange={(e) =>
                        setFilterValues({
                          ...filterValues,
                          maxPrice: e.target.value,
                        })
                      }
                      value={filterValues.maxPrice}
                      type="number"
                      placeholder="Max"
                    />
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
                    onChange={(val) =>
                      setFilterValues({ ...filterValues, country: val })
                    }
                    validatorMessage={""}
                    name={"country"}
                    placeholder={"Select country"}
                    label={""}
                    options={countryOptions}
                    value={filterValues.country}
                    // inputClass={styles.countrySelect}
                    parentClassName={styles.countrySelectWrap}
                  />
                  {/* <CustomSelect
                    onChange={() => {}}
                    validatorMessage={""}
                    name={"state"}
                    placeholder={"State"}
                    label={""}
                    options={[{ label: "Lagos", value: "Lagos" }]}
                    value={{ label: "Lagos", value: "Lagos" }}
                    inputClass={styles.stateSelect}
                    parentClassName={styles.stateSelectWrap}
                  /> */}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className={styles.btnSec}>
              <Button type={"primary"} onClick={applyFilters}>
                Apply
              </Button>
              <Button type={"tertiary"} onClick={resetFilters}>
                Clear
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
        {properties.length > 0 ? (
          <div className={styles.propertyList}>
            {properties.map((item, index) => (
              <PropertyCard
                primaryBtn={{
                  text: "Invest",
                  action: handleConnect,
                }}
                secondaryBtn={{
                  text: (
                    <span className={styles.scheduleCallBtn}>
                      <CalendarIconOutline /> Schedule Call
                    </span>
                  ),
                  action: (id) => console.log(id),
                }}
                type="row"
                size="normal"
                moreDetails={handleView}
                {...item}
                key={index}
                className={styles.property}
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
      </section>
    </>
  );
};

export { MarketplaceUI };
