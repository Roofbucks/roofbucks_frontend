import { CloseIcon, CheckIcon } from "assets";
import * as React from "react";
import { Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { ToastData } from "redux/types";

export interface ToastProps extends ToastData {
  closeModal: () => void;
}

const Toast: React.FC<ToastProps> = ({
  heading,
  text,
  closeModal,
  show,
  type,
}) => {
  return (
    <>
      <Modal
        className={`${styles.toast} ${!type ? styles.toastRed : ""}`}
        show={show}
        onHide={closeModal}
        centered
        id="toast"
      >
        <Modal.Body>
          {type ? (
            <CheckIcon className={styles.icon} />
          ) : (
            <CloseIcon className={styles.icon} />
          )}
          <div>
            <h6 className={styles.ttl}>{heading}</h6>
            <p className={styles.txt}>{text}</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export { Toast };
