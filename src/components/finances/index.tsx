import * as React from "react";
import styles from "./styles.module.css";
import { EmptyFinances, PlusIconFill } from "assets";
import {
  Button,
  Pagination,
  Table,
  TableHeaderItemProps,
  TransactionTable,
  TransactionTableItem,
} from "components";

const tableHeaderTitles: TableHeaderItemProps[] = [
  { title: "Property ID" },
  { title: "Property Name" },
  { title: "Invoice ID" },
  { title: "Amount" },
  { title: "Date" },
  { title: "" },
];

interface FinancesUIProps {
  tableBodyItems: TransactionTableItem[];
  viewProperty: (id) => void;
}

const FinancesUI: React.FC<FinancesUIProps> = ({
  tableBodyItems,
  viewProperty,
}) => {
  const [account, setAccount] = React.useState("00887774444");

  const accounts = [
    {
      name: "Jane Doe",
      bank: "Access Bank",
      number: "00887774444",
      active: true,
    },
    {
      name: "Jane Doe",
      bank: "Access Bank",
      number: "00887774464",
      active: false,
    },
  ];

  return (
    <>
      <h1 className={styles.ttl}>Finances</h1>
      <section className={styles.accountList}>
        {accounts.map((item) => (
          <div className={styles.accountCard}>
            <input
              className={account === item.number ? styles.selectedRadio : ""}
              onClick={() => setAccount(item.number)}
              checked={account === item.number}
              type="radio"
            />
            <div className={styles.accountInfo}>
              <p className={styles.name}>{item.name}</p>
              <p className={styles.bank}>{item.bank}</p>
              <p className={styles.number}>{item.number}</p>
            </div>
          </div>
        ))}
      </section>
      <Button className={styles.addBtn} type={"primary"} onClick={() => {}}>
        <PlusIconFill />
        Add new
      </Button>
      <p className={styles.tableTtl}>Transactions</p>
      <Table
        tableHeaderTitles={tableHeaderTitles}
        tableBody={
          <TransactionTable
            viewInvoice={() => {}}
            viewProperty={viewProperty}
            printInvoice={() => {}}
            tableBodyItems={tableBodyItems}
          />
        }
        customTableClasses={{
          tableWrapperClass: styles.tableWrap,
        }}
        emptyTable={{
          show: tableBodyItems.length <= 0,
          element: <EmptyFinancesElement />,
        }}
      />
    </>
  );
};

const EmptyFinancesElement = () => {
  return (
    <div className={styles.emptySec}>
      <EmptyFinances />
      <p>You don’t have anything in your finances</p>
    </div>
  );
};

export { FinancesUI };
