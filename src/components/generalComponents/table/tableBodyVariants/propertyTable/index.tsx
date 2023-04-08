import { EditIcon2, EyeIconOutline, BedIconOutline } from "assets";
import * as React from "react";
import { ActionItem, TableAction, TableBody } from "../../components";
import styles from "./styles.module.css";

// Test Table Body Item
export interface PropertyTableItem {
  propertyID: string;
  propertyName: string;
  status: string;
  amount: string;
  date: string;
}

// Test Table Body Props
interface TableBodyProps {
  tableBodyItems: PropertyTableItem[];
  edit: (id) => void;
  view: (id) => void;
  addStays: () => void;
  tableBodyItemClassName: string;
}

const PropertyTable: React.FC<TableBodyProps> = ({
  tableBodyItems,
  edit,
  view,
  addStays,
  tableBodyItemClassName,
}) => {
  const actions = (id): ActionItem[] => [
    {
      text: (
        <>
          <EditIcon2 className={styles.dropdownIcon} /> Edit
        </>
      ),
      action: () => edit(id),
    },
    {
      text: (
        <>
          <EyeIconOutline className={styles.dropdownIcon} /> View
        </>
      ),
      action: () => view(id),
    },
    {
      text: (
        <>
          <BedIconOutline className={styles.dropdownIcon} /> Add Stays
        </>
      ),
      action: addStays,
    },
  ];
  return (
    <>
      <TableBody customClassName={`${styles.tableBody}`}>
        {tableBodyItems.map((item, index) => (
          <tr key={`body ${index}`}>
            <td className={tableBodyItemClassName}>
              <p className={styles.propertyID}>{item.propertyID}</p>
            </td>
            <td className={tableBodyItemClassName}>
              <p className={styles.name}>{item.propertyName}</p>
            </td>
            <td className={tableBodyItemClassName}>{item.date}</td>
            <td className={tableBodyItemClassName}>$ {item.amount}</td>
            <td className={tableBodyItemClassName}>
              <p className={`${styles.status} ${styles[item.status]}`}>
                {item.status}
              </p>
            </td>
            <td className={tableBodyItemClassName}>
              <TableAction actions={actions(item.propertyID)} />
            </td>
          </tr>
        ))}
      </TableBody>
    </>
  );
};

export { PropertyTable };
