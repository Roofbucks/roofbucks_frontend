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
  minPrice: string;
  maxPrice: string;
  type: optionType[];
  status: optionType;
}

interface MarketplaceProps {
  properties: PropertyCardData[];
  pagination: PaginationProps;
  handleView: (id) => void;
  handleConnect: ({ id, percentage }) => void;
  search: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  submitFilter: ({ country, apartment, budget, status }) => void;
  filter: {
    country: optionType;
    budget: { min: string; max: string };
    apartment: optionType[];
    status: optionType;
  };
  isAgent: boolean;
}

const MarketplaceUI: React.FC<MarketplaceProps> = ({
  pagination,
  properties,
  handleView,
  search,
  submitFilter,
  handleConnect,
  filter,
  isAgent,
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
    minPrice: "",
    maxPrice: "",
    type: [],
    status: initialOptionType,
  });

  React.useEffect(() => {
    setFilterValues({
      country: filter.country,
      type: filter.apartment,
      status: filter.status,
      maxPrice: filter.budget.max,
      minPrice: filter.budget.min,
    });
  }, [filter]);

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
      minPrice: "",
      maxPrice: "",
      type: [],
      status: initialOptionType,
    });
    submitFilter({
      country: initialOptionType,
      apartment: [],
      status: initialOptionType,
      budget: {
        min: "",
        max: "",
      },
    });
  };

  const applyFilters = () => {
    submitFilter({
      country: filterValues.country,
      apartment: filterValues.type,
      status: filterValues.status,
      budget: {
        min: filterValues.minPrice,
        max: filterValues.maxPrice,
      },
    });
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
                      { label: "Completed", value: "Completed" },
                      { label: "In-progress", value: "In-progress" },
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
                    parentClassName={styles.countrySelectWrap}
                  />
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
                  action: () =>
                    handleConnect({
                      id: item.id,
                      percentage: parseInt(item.discount ?? ""),
                    }),
                }}
                secondaryBtn={{
                  text: isAgent ? (
                    <span className={styles.scheduleCallBtn}>
                      <CalendarIconOutline /> Schedule Call
                    </span>
                  ) : (
                    <a
                      target="_blank"
                      href={item.calendlyURL}
                      className={styles.scheduleCallBtn}
                    >
                      <CalendarIconOutline /> Schedule Call
                    </a>
                  ),
                  action: console.log,
                  disabled: isAgent,
                }}
                type="row"
                size="normal"
                moreDetails={handleView}
                {...item}
                discount={`${item.discount}% left`}
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
