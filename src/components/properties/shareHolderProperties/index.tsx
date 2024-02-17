import * as React from "react";
import styles from "./styles.module.css";
import {
  ActivityData,
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

export interface ShareholderPropertyData extends PropertyCardData {
  investorType: "home_owner" | "investor";
  rent: number;
  marketValue: number;
  percentageOwned: number;
}

interface ShareHolderPropertiesProps {
  handleSellShares: ({ id, name, marketValue, percentageOwned }) => void;
  handleView: (id) => void;
  handleBuyBack: ({ id, name, marketValue, percentageOwned }) => void;
  handlePayRent: ({ id, name, rent }) => void;
  tab: {
    value: string;
    handleChange: (tab: string) => void;
  };
  count: {
    all: number;
    applications: number;
  };
  properties: ShareholderPropertyData[];
  pagination: {
    current: number;
    total: number;
    handleChange: (page: number) => void;
    count: { start: number; end: number; total: number };
  };
  applications: PropertyApplicationTableItem[];
  handlePay: (id) => void;
  activity: ActivityData[];
  handleRemoveActivity: (id) => void;
}

const ShareHolderPropertiesUI: React.FC<ShareHolderPropertiesProps> = ({
  handleSellShares,
  handleView,
  handleBuyBack,
  handlePayRent,
  tab,
  count,
  properties,
  pagination,
  applications,
  handlePay,
  activity,
  handleRemoveActivity,
}) => {
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
                    text:
                      item.investorType === "home_owner"
                        ? "Pay rent"
                        : "Sell shares",
                    action: () =>
                      item.investorType === "home_owner"
                        ? handlePayRent({
                            id: item.id,
                            name: item.name,
                            rent:
                              (item.rent * (100 - item.percentageOwned)) / 100,
                          })
                        : handleSellShares({
                            id: item.id,
                            name: item.name,
                            marketValue: item.marketValue,
                            percentageOwned: item.percentageOwned,
                          }),
                    className: styles.pryBtn,
                  }}
                  moreDetails={handleView}
                  type="row"
                  size="normal"
                  secondaryBtn={
                    item.investorType === "home_owner"
                      ? {
                          text: "Buy back",
                          action: () =>
                            handleBuyBack({
                              id: item.id,
                              name: item.name,
                              marketValue: item.marketValue,
                              percentageOwned: item.percentageOwned,
                            }),
                          className: styles.secBtn,
                        }
                      : undefined
                  }
                />
              ))
            ) : (
              <EmptyProperties />
            )}
            <Pagination {...pagination} name={"Properties"} />
          </div>
          <ActivityList
            className={styles.activity}
            activities={activity}
            handleRemove={handleRemoveActivity}
          />
        </section>
      ) : (
        <section>
          <Table
            tableHeaderTitles={tableHeaderTitles}
            tableBody={
              <PropertyApplicationTable
                handlePay={handlePay}
                handleViewProperty={handleView}
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
          <Pagination {...pagination} name={"Application(s)"} />
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
