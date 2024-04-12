import { Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { LogoWithText, TransactionTableItem } from "components";

interface Props extends TransactionTableItem {
  show: boolean;
  close: () => void;
  user: { name: string; address: string; number: string; email: string };
}

const ReceiptModal: React.FC<Props> = ({
  show,
  close,
  invoiceID,
  date,
  propertyID,
  address,
  description,
  amount,
  user,
  propertyName,
  status,
}) => {
  return (
    <>
      <Modal
        show={show}
        centered
        onHide={close}
        dialogClassName={styles.dialog}
      >
        {window.innerWidth > 600 ? (
          <section className={styles.content}>
            <div className={styles.side}>
              <LogoWithText className={styles.logo} type={"light"} />
              <div className={styles.invoiceNo}>
                <p>REF: {invoiceID}</p>
                <p>{new Date(date).toDateString()}</p>
              </div>
              <div className={styles.contact}>
                <p>RECEIPT TO:</p>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.address}</p>
                <p>{user.number}</p>
              </div>
              <p className={styles.support}>SUPPORT@ROOFBUCKS.COM</p>
            </div>
            <div className={styles.body}>
              <div className={styles.header}>
                <h1 className={styles.ttl}>Receipt</h1>
                <span
                  className={`${styles.status} ${
                    styles[
                      `status--${status === "success" ? "paid" : "pending"}`
                    ]
                  }`}
                >
                  {status === "success" ? "paid" : status}
                </span>
              </div>

              <div className={styles.property}>
                <p className={styles.propertyId}>
                  PROPERTY NAME: {propertyName}
                </p>
                <p className={styles.propertyId}>PROPERTY ID: #{propertyID}</p>
                <p className={styles.address}>{address}</p>
              </div>
              <div className={styles.tableHd}>
                <p>DESCRIPTION</p>
                <p>AMOUNT</p>
              </div>
              <div className={styles.tableItem}>
                <p>{description}</p>
                <p>{amount}</p>
              </div>
              <div className={styles.tableTotal}>
                <p>Total Amount</p>
                <p>{amount}</p>
              </div>
              <LogoWithText className={styles.bttomLogo} type={"dark"} />
            </div>
          </section>
        ) : (
          <div className={styles.noReceipt}>
            Please view the receipt on a desktop device
          </div>
        )}
      </Modal>
    </>
  );
};

export { ReceiptModal };
