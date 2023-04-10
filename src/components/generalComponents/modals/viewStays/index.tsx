import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import styles from "./styles.module.css";
import { CloseIcon2, EmptyStreet } from "assets";
import { Button } from "components";

interface StayData {
  start: string;
  end: string;
}

interface Stays {
  stay: StayData[];
}

interface ViewStayModalProps {
  show: boolean;
  close: () => void;
  stays: StayData[];
  handleAdd: () => void;
  deleteStay: (x) => void;
}

const ViewStayModal: React.FC<ViewStayModalProps> = ({
  show,
  stays,
  close,
  handleAdd,
  deleteStay,
}) => {
  return (
    <>
      <Modal onHide={close} show={show} centered>
        <ModalHeader className={styles.header}>
          <div>
            <p className={styles.tag}>Stay Periods</p>
            <h1>St John Francis Hotel and suite </h1>
            <p className={styles.txt}>
              View available stay periods for your shareholders.
            </p>
          </div>
          <CloseIcon2
            role="button"
            onClick={close}
            className={styles.closeBtn}
          />
        </ModalHeader>
        <ModalBody className={styles.body}>
          {stays.length > 0 ? (
            <section className={styles.table}>
              <div className={styles.tableHd}>
                <p>Start</p>
                <p>End</p>
              </div>
              {stays.map((item, index) => (
                <div key={index} className={styles.tableItem}>
                  <p>{item.start}</p>
                  <p>{item.end}</p>
                  <CloseIcon2
                    onClick={() => deleteStay(index)}
                    role="button"
                    className={styles.closeBtn}
                  />
                </div>
              ))}
            </section>
          ) : (
            <div className={styles.empty} >
              <EmptyStreet />
              <p>You haven’t added any stay periods</p>
            </div>
          )}

          <Button className={`${styles.addBtn} ${stays.length === 0 ? styles.centerBtn : ""}`} onClick={handleAdd} type="primary">
            Add
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export { ViewStayModal };
