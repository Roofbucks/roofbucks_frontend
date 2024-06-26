import { Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { Button } from "components";
import { CloseIcon2 } from "assets";
import { ModalProps, optionType } from "types";

interface PayRentProps extends ModalProps {
  submit: () => void;
  propertyName: string;
  rent: number;
}

const PayRentModal: React.FC<PayRentProps> = ({
  show,
  closeModal,
  submit,
  propertyName,
  rent,
}) => {
  return (
    <>
      <Modal
        contentClassName={styles.modal}
        centered
        onHide={closeModal}
        show={show}
      >
        <CloseIcon2
          onClick={closeModal}
          className={styles.closeBtn}
          role="button"
        />
        <p>Pay Annual Rent</p>
        <h1 className={styles.ttl}>{propertyName}</h1>
        <p className={styles.txt}>Your rent costs: <b>NGN {rent.toLocaleString()} per annum</b></p>
        <p className={styles.note}>
          Transaction charges may apply, read{" "}
          <a target="_blank">terms of use</a>
        </p>
        <Button onClick={submit} type="primary" className={styles.btn}>
          Checkout
        </Button>
      </Modal>
    </>
  );
};

export { PayRentModal };
