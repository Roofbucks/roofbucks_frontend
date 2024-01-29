import { Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { Routes } from "router";
import { CloseIcon2 } from "assets";

interface Props {
  show: boolean;
  close: () => void;
}

const CompleteProfilePrompt: React.FC<Props> = ({ show, close }) => {
  const account = JSON.parse(localStorage.getItem("profileCompletion") ?? "{}");

  return (
    <Modal contentClassName={styles.content} show={show} onHide={close}>
      <div className={styles.header}>
        <h1>Profile Incomplete</h1>
        <CloseIcon2 role="button" onClick={close} />
      </div>
      <p>
        Your account information is currently incomplete, you have to setup your
        business profile to proceed with this purchase.
      </p>
      <Link
        className={styles.link}
        to={Routes.profileSetup(
          !account.profile ? "?profile=true" : "?billing=true"
        )}
      >
        Setup profile
      </Link>
    </Modal>
  );
};

export { CompleteProfilePrompt };
