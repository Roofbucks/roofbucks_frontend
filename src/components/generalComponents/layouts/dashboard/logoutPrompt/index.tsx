import styles from "./styles.module.css";
import * as React from "react";
import { Modal } from "react-bootstrap";
import { LogoutOutlineIcon } from "assets";
import { Button } from "components/generalComponents/button";

interface PromptProps {
  show: boolean;
  closeModal: () => void;
  logoutAction: () => void;
}

const Logout: React.FC<PromptProps> = ({ show, closeModal, logoutAction }) => {
  return (
    <Modal
      className={styles["logout"]}
      show={show}
      onHide={closeModal}
      centered
    >
      <Modal.Body>
        <LogoutOutlineIcon className={styles.img} />
        <p className={styles.txt}>Are you sure you want to logout?</p>
        <div className={styles.btnsec}>
          <Button type="primary" className={styles.btn1} onClick={closeModal}>
            No
          </Button>
          <Button type="primary" className={styles.btn2} onClick={logoutAction}>
            Yes
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { Logout };
