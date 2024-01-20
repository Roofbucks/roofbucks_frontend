import { Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { Routes } from "router";
import { CloseIcon2 } from "assets";

interface Props {
  show: boolean;
  close: () => void;
}

const LoginPrompt: React.FC<Props> = ({ show, close }) => {
  return (
    <Modal contentClassName={styles.content} show={show} onHide={close}>
      <div className={styles.header} >
        <h1>Unauthorized</h1>
        <CloseIcon2 role="button" onClick={close} />
      </div>
      <p>
        You are not authorized to perform this action, please login or create an
        account to continue.
      </p>
      <div className={styles.btns} >
        <Link to={Routes.login}>Login</Link>
        <Link to={Routes.signup}>Create an account</Link>
      </div>
    </Modal>
  );
};

export { LoginPrompt };
