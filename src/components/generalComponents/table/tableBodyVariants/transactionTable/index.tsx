import { EyeIconOutline, PrinterIconOutline } from "assets";
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
  description: string;
  address: string;
  status: string;
}

// Test Table Body Props
interface TableBodyProps {
  tableBodyItems: TransactionTableItem[];
  viewProperty: (id) => void;
  viewReceipt: (data: TransactionTableItem) => void;
}

const TransactionTable: React.FC<TableBodyProps> = ({
  tableBodyItems,
  viewProperty,
  viewReceipt,
}) => {
  return (
    <>
      <TableBody customClassName={styles.hideOnMobile}>
        {tableBodyItems.map((item, index) => {
          const actions: ActionItem[] = [
            {
              text: (
                <>
                  <EyeIconOutline className={styles.dropdownIcon} /> View
                  Property
                </>
              ),
              action: () => viewProperty(item.propertyID),
            },
            {
              text: (
                <>
                  <EyeIconOutline className={styles.dropdownIcon} /> View
                  Receipt
                </>
              ),
              action: () => viewReceipt(item),
            },
          ];
          return (
            <tr key={`body ${index}`}>
              <td>
                <span className={styles.id}>{item.propertyID}</span>
              </td>
              <td>{item.propertyName}</td>
              <td>{item.invoiceID}</td>
              <td>{item.amount}</td>
              <td className={styles[item.status]} >{item.status}</td>
              <td>{item.date}</td>
              <td>
                <TableAction actions={actions} />
              </td>
            </tr>
          );
        })}
      </TableBody>
    </>
  );
};

export { TransactionTable };
