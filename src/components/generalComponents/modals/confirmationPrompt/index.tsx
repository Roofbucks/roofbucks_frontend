import styles from "./styles.module.css";
import { CloseIcon } from "assets";
import { Button } from "components";
import { ReactNode } from "react";
import { Modal } from "react-bootstrap";

interface ConfirmationModalProps {
  show: boolean;
  close: () => void;
  text: string | ReactNode;
  submit: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  close,
  text,
  submit,
}) => {
  return (
    <>
      <Modal
        dialogClassName={styles.dialog}
        contentClassName={styles.modal}
        centered
        onHide={close}
        show={show}
      >
        <div className={styles.header}>
          <p>Confirm action</p>
          <CloseIcon role="button" onClick={close} />
        </div>
        <p className={styles.txt}>{text}</p>
        <div className={styles.footer}>
          <Button type="secondary" onClick={close}>
            Close
          </Button>
          <Button type="primary" onClick={submit}>
            Yes, continue
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { ConfirmationModal };
