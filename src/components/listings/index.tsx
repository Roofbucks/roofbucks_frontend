import {
  CalendarIconOutline,
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
  handleApply: ({ id, totalCost }) => void;
  search: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  handleApartmentFilter: () => void;
  handleBudgetFilter: () => void;
  handleCountryFilter: () => void;
  handleStatusFilter: () => void;
  isAgent: boolean;
  filters: {
    country: boolean;
    apartment: boolean;
    status: boolean;
    budget: boolean;
    reset: () => void;
  };
}

const ListingsUI: React.FC<ListingsProps> = ({
  properties,
  pagination,
  search,
  handleView,
  handleApply,
  handleApartmentFilter,
  handleBudgetFilter,
  handleCountryFilter,
  handleStatusFilter,
  isAgent,
  filters,
}) => {
  const filterOptions = [
    {
      name: "Country",
      onClick: handleCountryFilter,
    },
    {
      name: "Budget",
      onClick: handleBudgetFilter,
    },
    {
      name: "Apartment",
      onClick: handleApartmentFilter,
    },
    {
      name: "Status",
      onClick: handleStatusFilter,
    },
  ];

  return (
    <>
      <HeroSection
        text={`Explore our properties to find the perfect home for yourself from our verified businesses. `}
        title="Property Listing"
      />

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
              {filterOptions.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`${styles.filterItem} `}
                >
                  {item.name} <CaretRight />
                  {filters[item.name.toLowerCase()] ? (
                    <span className={styles["filterItem--active"]}></span>
                  ) : (
                    ""
                  )}
                </button>
              ))}
              <button onClick={filters.reset} className={styles.resetBtn}>
                Reset
              </button>
            </div>
          </div>

          {properties.length > 0 ? (
            <>
              <div className={styles.propertyListings}>
                {properties.map((item, index) => (
                  <PropertyCard
                    primaryBtn={{
                      text: "Buy",
                      action: () =>
                        handleApply({ id: item.id, totalCost: item.amount }),
                      disabled: isAgent,
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
                    type="column"
                    size="normal"
                    moreDetails={handleView}
                    {...item}
                    key={index}
                  />
                ))}
              </div>
              <Pagination {...pagination} />
            </>
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
