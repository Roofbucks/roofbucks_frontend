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
}

// Test Table Body Props
interface TableBodyProps {
  tableBodyItems: TransactionTableItem[];
  viewProperty: (id) => void;
  viewReceipt: () => void;
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
              action: viewReceipt,
            },
          ];
          return (
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
          );
        })}
      </TableBody>
    </>
  );
};

export { TransactionTable };
