import { Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { Button } from "components";
import { CloseIcon2 } from "assets";
import { ModalProps, optionType } from "types";

interface PayRentProps extends ModalProps {
  submit: () => void;
}

const PayRentModal: React.FC<PayRentProps> = ({ show, closeModal, submit }) => {
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
        <h1 className={styles.ttl}>Two Bedroom Apartment ..</h1>
        {/* SHow amount and checkout */}
        <h2>NGN 2,000,000 per annum</h2>
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
