import { Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { LogoWithText } from "components";

const ReceiptModal = ({ show, close }) => {
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
                <p>Invoice #002</p>
                <p>December 15, 2025</p>
              </div>
              <div className={styles.contact}>
                <p>BILL TO:</p>
                <p>Jasmine Pedraza</p>
                <p>jasmine@gmail.com</p>
                <p>408 Byers Lane, Sacramento, CA</p>
                <p>08188772277</p>
              </div>

              <p className={styles.support}>SUPPORT@ROOFBUCKS.COM</p>
            </div>
            <div className={styles.body}>
              <h1 className={styles.ttl}>Receipt</h1>

              <div className={styles.property}>
                <p className={styles.propertyId}>PROPERTY ID: #123455</p>
                <p className={styles.address}>No 8, Abah Street, Yaba, Lagos</p>
              </div>
              <div className={styles.tableHd}>
                <p>DESCRIPTION</p>
                <p>AMOUNT</p>
              </div>
              <div className={styles.tableItem}>
                <p>RENT REPAYMENT: 1 YEAR</p>
                <p>NGN 500,000</p>
              </div>
              <div className={styles.tableTotal}>
                <p>Total Amount</p>
                <p>NGN 500,000</p>
              </div>
              <LogoWithText className={styles.bttomLogo} type={"dark"} />
            </div>
          </section>
        ) : (
          <div className={styles.noReceipt} >Please view the receipt on a desktop device</div>
        )}
      </Modal>
    </>
  );
};

export { ReceiptModal };
