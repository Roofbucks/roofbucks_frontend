import { Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { CheckBox } from "components/generalComponents/checkBox";
import { propertyTypeOptions } from "utils";
import { Button } from "components/generalComponents/button";
import { CloseIcon2 } from "assets";

interface Props {
  show: boolean;
  close: () => void;
}

const ApartmentTypeFilterModal: React.FC<Props> = ({ show, close }) => {
  return (
    <Modal show={show} onHide={close} contentClassName={styles.content}>
      <div className={styles.heading}>
        <h1 className={styles.ttl}>Filter by Apartment Type:</h1>
        <CloseIcon2 role="button" onClick={close} />
      </div>
      <div className={styles.checkList}>
        {propertyTypeOptions.map((item) => (
          <CheckBox label={item.label} check={false} onChange={console.log} />
        ))}
      </div>
      <div className={styles.btns}>
        <Button type="secondary" onClick={console.log}>
          Reset
        </Button>
        <Button type="primary" onClick={console.log}>
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export { ApartmentTypeFilterModal };
