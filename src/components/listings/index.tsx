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
  handleApply: (id) => void;
  search: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  submitFilter: (data) => void;
  handleApartmentFilter: () => void;
  handleBudgetFilter: () => void;
  handleCountryFilter: () => void;
  handleStatusFilter: () => void;
}

const ListingsUI: React.FC<ListingsProps> = ({
  properties,
  pagination,
  search,
  handleView,
  submitFilter,
  handleApply,
  handleApartmentFilter,
  handleBudgetFilter,
  handleCountryFilter,
  handleStatusFilter,
}) => {
  const filters = [
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
            <>
              <div className={styles.propertyListings}>
                {properties.map((item, index) => (
                  <PropertyCard
                    primaryBtn={{
                      text: "Apply",
                      action: (id) => handleApply(id),
                    }}
                    secondaryBtn={{
                      text: (
                        <a
                          target="_blank"
                          href={item.calendlyURL}
                          className={styles.scheduleCallBtn}
                        >
                          <CalendarIconOutline /> Schedule Call
                        </a>
                      ),
                      action: (id) => console.log(id),
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
