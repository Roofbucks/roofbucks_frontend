import { Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { Routes } from "router";
import { CloseIcon2 } from "assets";

interface Props {
  show: boolean;
  close: () => void;
  type: "incomplete" | "unverified";
}

const CompleteProfilePrompt: React.FC<Props> = ({ show, close, type }) => {
  const account = JSON.parse(localStorage.getItem("profileCompletion") ?? "{}");

  return (
    <Modal
      contentClassName={styles.content}
      show={show}
      centered
      onHide={close}
    >
      <div className={styles.header}>
        <h1>
          {type === "incomplete"
            ? "Profile Incomplete"
            : "Account Awaiting Verification"}
        </h1>
        <CloseIcon2 role="button" onClick={close} />
      </div>
      <p>
        {type === "incomplete"
          ? `Your account information is currently incomplete, you have to setup your
        business profile to proceed with this purchase.`
          : `Your account is still awaiting verification, an account approval is required to proceed with this purchase.`}
      </p>
      <Link
        className={styles.link}
        to={
          type === "incomplete"
            ? Routes.profileSetup(
                !account.profile ? "?profile=true" : "?billing=true"
              )
            : Routes.contact
        }
      >
        {type === "incomplete" ? "Setup profile" : "Contact support"}
      </Link>
    </Modal>
  );
};

export { CompleteProfilePrompt };
