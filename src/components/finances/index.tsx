import * as React from "react";
import styles from "./styles.module.css";
import { EmptyFinances, PlusIconFill, TrashIcon } from "assets";
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
  { title: "Reference ID" },
  { title: "Amount" },
  { title: "Date" },
  { title: "" },
];

export interface BankAccountData {
  name: string;
  bank: string;
  number: string;
  active: boolean;
}

interface FinancesUIProps {
  tableBodyItems: TransactionTableItem[];
  viewProperty: (id) => void;
  accounts: BankAccountData[];
  handleAddBank: () => void;
  handlePrimaryBank: (index: number) => void;
  handleDeleteBank: (index: number) => void;
  handleReceipt: (data: TransactionTableItem) => void;
}

const FinancesUI: React.FC<FinancesUIProps> = ({
  tableBodyItems,
  viewProperty,
  accounts,
  handleAddBank,
  handleDeleteBank,
  handlePrimaryBank,
  handleReceipt,
}) => {
  return (
    <>
      <h1 className={styles.ttl}>Finances</h1>
      <section className={styles.accountList}>
        {accounts.map((item, index) => (
          <div className={styles.accountCard}>
            <input
              className={item.active ? styles.selectedRadio : ""}
              onClick={() => handlePrimaryBank(index)}
              checked={item.active}
              type="radio"
            />
            <div className={styles.accountInfo}>
              <p className={styles.name}>{item.name}</p>
              <p className={styles.bank}>{item.bank}</p>
              <p className={styles.number}>{item.number}</p>
            </div>
            {!item.active ? (
              <TrashIcon
                className={styles.delete}
                role="button"
                onClick={() => handleDeleteBank(index)}
              />
            ) : (
              ""
            )}
          </div>
        ))}
      </section>
      <i className={styles.note}>
        Note: You can only add up to 6 bank accounts and you cannot delete the
        primary bank account
      </i>
      <Button
        disabled={accounts.length >= 6}
        className={styles.addBtn}
        type={"primary"}
        onClick={handleAddBank}
      >
        <PlusIconFill />
        Add new bank account
      </Button>
      <p className={styles.tableTtl}>Transactions</p>
      <Table
        tableHeaderTitles={tableHeaderTitles}
        tableBody={
          <TransactionTable
            viewReceipt={handleReceipt}
            viewProperty={viewProperty}
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
