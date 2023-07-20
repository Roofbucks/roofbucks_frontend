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
  search: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  hide: boolean;
  editProperty: (id: string) => void;
  viewProperty: (id: string) => void;
  promote: (id: string) => void;
}

const AgentPropertiesUI: React.FC<AgentPropertiesUIProps> = ({
  addProperty,
  tableItems,
  search,
  hide,
  editProperty,
  viewProperty,
  promote,
}) => {
  const tableHeaderTitles: TableHeaderItemProps[] = [
    { title: "Property ID" },
    { title: "Property Name" },
    { title: "Date" },
    { title: "Amount" },
    { title: "Status" },
    { title: "" },
  ];

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
          <input
            type="search"
            placeholder="Search by property name"
            value={search.value}
            onChange={search.onChange}
          />
        </div>

        <Table
          tableHeaderTitles={tableHeaderTitles}
          tableBody={
            <PropertyTable
              edit={editProperty}
              view={viewProperty}
              tableBodyItems={tableItems}
              tableBodyItemClassName={styles.tableBodyItem}
              promote={promote}
            />
          }
          customTableClasses={{
            tableWrapperClass: styles.tableWrap,
            tableHeaderClassName: styles.tableHeader,
            tableHeaderItemClassName: styles.tableHeaderItem,
          }}
          emptyTable={{
            show: tableItems.length <= 0 && !hide,
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
      <Button
        className={`${styles.addBtn} ${styles.center}`}
        type={"primary"}
        onClick={() => {}}
      >
        <PlusIconFill />
        Add new property
      </Button>
    </div>
  );
};
