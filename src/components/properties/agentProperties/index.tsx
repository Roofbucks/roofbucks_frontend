import { EmptyStreet, PlusIconFill, SearchIcon } from "assets";
import {
  Button,
  PropertyTable,
  PropertyTableItem,
  Table,
  TableHeaderItemProps,
} from "components/generalComponents";
import * as React from "react";
import styles from "./styles.module.css";

interface AgentPropertiesUIProps {
  tableItems: PropertyTableItem[];
  addProperty;
}

const AgentPropertiesUI: React.FC<AgentPropertiesUIProps> = ({
  addProperty,
  tableItems,
}) => {
  const tableItem: PropertyTableItem = {
    propertyID: "#C123456",
    propertyName: "St John Francis Hotel and suite",
    amount: "NGN 100,000,000.00",
    date: "14/12/2022",
    status: "pending",
  };

  const items: PropertyTableItem[] = [
    {
      propertyID: "#C123456",
      propertyName: "St John Francis Hotel and suite",
      amount: "NGN 100,000,000.00",
      date: "14/12/2022",
      status: "pending",
    },
    {
      propertyID: "#C123456",
      propertyName: "St John Francis Hotel and suite",
      amount: "NGN 100,000,000.00",
      date: "14/12/2022",
      status: "rejected",
    },
    {
      propertyID: "#C123456",
      propertyName: "St John Francis Hotel and suite",
      amount: "NGN 100,000,000.00",
      date: "14/12/2022",
      status: "incomplete",
    },
    {
      propertyID: "#C123456",
      propertyName: "St John Francis Hotel and suite",
      amount: "NGN 100,000,000.00",
      date: "14/12/2022",
      status: "approved",
    },
  ];
  const tableHeaderTitles: TableHeaderItemProps[] = [
    { title: "Property ID" },
    { title: "Property Name" },
    { title: "Date" },
    { title: "Amount" },
    { title: "Status" },
    { title: "" },
  ];
  const tableBodyItems: PropertyTableItem[] = [...items, ...items];

  return (
    <>
      <section className={styles.heading}>
        <h1 className={styles.ttl}>Properties</h1>
        <Button
          className={styles.addBtn}
          type={"primary"}
          onClick={addProperty}
        >
          <PlusIconFill />
          Add new property
        </Button>
      </section>
      <section>
        <div className={styles.searchWrap}>
          <SearchIcon />
          <input type="search" placeholder="Search by property name" />
        </div>
        <Table
          tableHeaderTitles={tableHeaderTitles}
          tableBody={
            <PropertyTable
              edit={() => {}}
              view={(id) => console.log(id)}
              addStays={() => {}}
              tableBodyItems={tableBodyItems}
              tableBodyItemClassName={styles.tableBodyItem}
            />
          }
          customTableClasses={{
            tableWrapperClass: styles.tableWrap,
            tableHeaderClassName: styles.tableHeader,
            tableHeaderItemClassName: styles.tableHeaderItem,
          }}
          emptyTable={{
            show: tableBodyItems.length <= 0,
            element: <EmptyProperties />,
          }}
        />
      </section>
    </>
  );
};

export { AgentPropertiesUI };

const EmptyProperties = () => {
  return (
    <div className={styles.emptySec}>
      <EmptyStreet />
      <p>You haven’t added any properties</p>
      <Button className={styles.addBtn} type={"primary"} onClick={() => {}}>
        <PlusIconFill />
        Add new property
      </Button>
    </div>
  );
};
