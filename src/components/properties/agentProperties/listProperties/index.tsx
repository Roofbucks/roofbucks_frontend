import { EmptyStreet, PlusIconFill, SearchIcon } from "assets";
import {
  Button,
  PropertyTable,
  PropertyTableItem,
  Table,
  TableHeaderItemProps,
} from "components";
import * as React from "react";
import styles from "./styles.module.css";

interface ListPropertiesProps {
  tableBodyItems: PropertyTableItem[];
  addStays: () => void;
  edit: () => void;
  addProperty: () => void;
}

const ListProperties: React.FC<ListPropertiesProps> = ({
  tableBodyItems,
  addProperty,
  addStays,
  edit,
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
    <section>
      <div className={styles.searchWrap}>
        <SearchIcon />
        <input type="search" placeholder="Search by property name" />
      </div>
      <Table
        tableHeaderTitles={tableHeaderTitles}
        tableBody={
          <PropertyTable
            edit={edit}
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
  );
};

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

export { ListProperties };
