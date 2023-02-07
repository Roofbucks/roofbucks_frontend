import { PlusIconFill } from "assets";
import { Button, PropertyTableItem } from "components/generalComponents";
import * as React from "react";
import { AddProperty } from "./addProperty";
import { ListProperties } from "./listProperties";
import styles from "./styles.module.css";

const AgentPropertiesUI = () => {
  const [showAddProperty, setShowAddProperty] = React.useState(false);

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

  const tableBodyItems: PropertyTableItem[] = [...items, ...items];
  
  return (
    <>
      <section className={styles.heading}>
        <h1 className={styles.ttl}>Properties</h1>
        <Button
          className={styles.addBtn}
          type={"primary"}
          onClick={() => setShowAddProperty(true)}
        >
          <PlusIconFill />
          Add new property
        </Button>
      </section>
      <>
        {showAddProperty ? (
          <AddProperty
            closeForm={() => {
              window.scrollTo(-0, -0);
              setShowAddProperty(false);
            }}
          />
        ) : (
          <ListProperties
            tableBodyItems={tableBodyItems}
            addStays={() => {}}
            edit={() => {}}
            addProperty={() => setShowAddProperty(true)}
          />
        )}
      </>
    </>
  );
};

export { AgentPropertiesUI };
