import * as React from "react";
import styles from "./styles.module.css";
import {
  ActivityList,
  AmenityProp,
  Dropdown,
  DropdownListItem,
  Pagination,
  PropertyApplicationTable,
  PropertyApplicationTableItem,
  PropertyCard,
  PropertyCardData,
  PropertyCardProps,
  Table,
  TableHeaderItemProps,
} from "components/generalComponents";
import { property3, EmptyStreet } from "assets";

const tableHeaderTitles: TableHeaderItemProps[] = [
  { title: "Property/Agent" },
  { title: "Type" },
  { title: "Percentage" },
  { title: "Amount To Pay" },
  { title: "Date" },
  { title: "" },
];

interface ShareHolderPropertiesProps {
  handleSellShares: (id) => void;
  handleView: (id) => void;
  handleBuyBack: (id) => void;
  handlePayRent: (id) => void;
  tab: {
    value: string;
    handleChange: (tab: string) => void;
  };
  count: {
    all: number;
    applications: number;
  };
  properties: PropertyCardData[];
}

const ShareHolderPropertiesUI: React.FC<ShareHolderPropertiesProps> = ({
  handleSellShares,
  handleView,
  handleBuyBack,
  handlePayRent,
  tab,
  count,
  properties,
}) => {
  const application: PropertyApplicationTableItem = {
    id: "123",
    propertyID: "123",
    percentage: 50,
    property: "Property Name",
    agent: "Musa Abdullahi",
    checkoutURL: "",
    type: "home_owner",
    date: "12/12/2023",
    amount: 250000,
  };

  const applications: PropertyApplicationTableItem[] = [
    ...new Array(5).fill(application),
    ...new Array(5).fill({ ...application, type: "investor" }),
  ];

  return (
    <>
      <h1 className={styles.ttl}>Properties</h1>

      <section className={styles.tabs}>
        <span
          role="button"
          onClick={() => tab.handleChange("properties")}
          className={tab.value === "properties" ? styles.active : ""}
        >
          Properties ({count.all})
        </span>
        <span
          role="button"
          onClick={() => tab.handleChange("applications")}
          className={tab.value === "applications" ? styles.active : ""}
        >
          Applications ({count.applications})
        </span>
      </section>
      {tab.value === "properties" ? (
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
                    action: () => handleSellShares(item.id),
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
            <Pagination
              current={0}
              total={0}
              handleChange={console.log}
              count={{
                start: 0,
                end: 0,
                total: 0,
              }}
              name={"Properties"}
            />
          </div>
          <ActivityList className={styles.activity} />
        </section>
      ) : (
        <section>
          <Table
            tableHeaderTitles={tableHeaderTitles}
            tableBody={
              <PropertyApplicationTable
                handleViewProperty={console.log}
                tableBodyItems={applications}
                tableBodyItemClassName={styles.tableBodyItem}
              />
            }
            customTableClasses={{
              tableWrapperClass: styles.tableWrap,
              tableHeaderClassName: styles.tableHeader,
              tableHeaderItemClassName: styles.tableHeaderItem,
            }}
            emptyTable={{
              show: applications.length === 0,
              element: <EmptyProperties />,
            }}
          />
          <Pagination
            current={0}
            total={0}
            handleChange={console.log}
            count={{
              start: 0,
              end: 0,
              total: 0,
            }}
            name={"Properties"}
          />
        </section>
      )}
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
