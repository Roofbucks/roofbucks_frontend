import * as React from "react";
import { MainRouter } from "./router";
import { Toast } from "components";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { updateToast, updateUser } from "redux/actions";
import { useLocation } from "react-router-dom";
import { users } from "types";

function App() {
  const { pathname } = useLocation();
  const toast = useAppSelector((state) => state.toast);
  const dispatch = useAppDispatch();
  const closeModal = () => dispatch(updateToast({ ...toast, show: false }));

  React.useEffect(() => {
    const role = localStorage.getItem("role") ?? "";
    const firstName = localStorage.getItem("firstName") ?? "";
    const lastName = localStorage.getItem("lastName") ?? "";
    const email = localStorage.getItem("email") ?? "";

    dispatch(
      updateUser({
        role,
        firstName,
        lastName,
        email,
      })
    );
  }, []);

  return (
    <>
      <Toast {...toast} closeModal={closeModal} />
      <MainRouter />
    </>
  );
}

export default App;
