import styles from "./styles.module.css";
import * as React from "react";
import { Modal } from "react-bootstrap";
import { LogoutOutlineIcon } from "assets";
import { Button } from "components/generalComponents/button";
import { useNavigate } from "react-router-dom";
import { resetStore } from "redux/actions";
import { useAppDispatch } from "redux/hooks";
import { Routes } from "router";
import { Preloader } from "components";

interface PromptProps {
  show: boolean;
  closeModal: () => void;
}

const Logout: React.FC<PromptProps> = ({ show, closeModal }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = React.useState(false);

  const logout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.clear();
      setLoading(false);
      closeModal();
      dispatch(resetStore());
      navigate(Routes.home);
    }, 1000);
  };

  return (
    <>
      <Preloader loading={loading} />
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
            <Button type="primary" className={styles.btn2} onClick={logout}>
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export { Logout };
