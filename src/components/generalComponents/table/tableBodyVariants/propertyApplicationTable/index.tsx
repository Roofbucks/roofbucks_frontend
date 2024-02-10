import { EyeIconOutline } from "assets";
import * as React from "react";
import { TableBody } from "../../components";
import styles from "./styles.module.css";

// Property Application Table Body Item
export interface PropertyApplicationTableItem {
  id: string;
  property: string;
  agent: string;
  propertyID: string;
  percentage: number;
  amount: number;
  type: "home_owner" | "investor";
  date: string;
  txnId: string;
}

// Property Application Table Body Props
interface TableBodyProps {
  tableBodyItems: PropertyApplicationTableItem[];
  tableBodyItemClassName?: string;
  tableBodyRowClassName?: string;
  handleViewProperty: (id) => void;
  handlePay: (id) => void;
}

const PropertyApplicationTable: React.FC<TableBodyProps> = ({
  tableBodyItems,
  tableBodyItemClassName,
  tableBodyRowClassName,
  handleViewProperty,
  handlePay,
}) => {
  return (
    <>
      <TableBody customClassName={`${styles.tableBody}`}>
        {tableBodyItems.map((item, index) => (
          <tr
            key={`body ${index}`}
            className={`${styles.tableBodyRow} ${tableBodyRowClassName}`}
          >
            <td className={tableBodyItemClassName}>
              <p
                role="button"
                onClick={() => handleViewProperty(item.propertyID)}
                className={styles.property}
              >
                {item.property}
              </p>
              <p className={styles.agent}>{item.agent}</p>
            </td>
            <td className={tableBodyItemClassName}>
              {item.type.replaceAll("_", " ")}
            </td>
            <td className={tableBodyItemClassName}>{item.percentage}%</td>
            <td className={tableBodyItemClassName}>{item.amount}</td>
            <td className={tableBodyItemClassName}>{item.date}</td>
            <td className={tableBodyItemClassName}>
              <button
                onClick={() => handlePay(item.txnId)}
                className={styles.payBtn}
              >
                Pay
              </button>
            </td>
          </tr>
        ))}
      </TableBody>
    </>
  );
};

export { PropertyApplicationTable };
