import { EyeIconOutline, PrinterIconOutline } from "assets";
import { Dropdown, DropdownListItem } from "components";
import * as React from "react";
import { ActionItem, TableAction, TableBody } from "../../components";
import styles from "./styles.module.css";

// Test Table Body Item
export interface TransactionTableItem {
  propertyID: string;
  propertyName: string;
  invoiceID: string;
  amount: string;
  date: string;
}

// Test Table Body Props
interface TableBodyProps {
  tableBodyItems: TransactionTableItem[];
}

const TransactionTable: React.FC<TableBodyProps> = ({ tableBodyItems }) => {
  const actions: ActionItem[] = [
    {
      text: (
        <>
          <EyeIconOutline className={styles.dropdownIcon} /> View Property
        </>
      ),
      action: () => {},
    },
    {
      text: (
        <>
          <EyeIconOutline className={styles.dropdownIcon} /> View Invoice
        </>
      ),
      action: () => {},
    },
    {
      text: (
        <>
          <PrinterIconOutline className={styles.dropdownIcon} /> Print Invoice
        </>
      ),
      action: () => {},
    },
  ];
  return (
    <>
      <TableBody customClassName={styles.hideOnMobile}>
        {tableBodyItems.map((item, index) => (
          <tr key={`body ${index}`}>
            <td>{item.propertyID}</td>
            <td>{item.propertyName}</td>
            <td>{item.invoiceID}</td>
            <td>{item.amount}</td>
            <td>{item.date}</td>
            <td>
              <TableAction actions={actions} />
            </td>
          </tr>
        ))}
      </TableBody>
    </>
  );
};

export { TransactionTable };
