import * as React from "react";
import { MainRouter } from "./router";
import { Toast } from "components";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { updateToast } from "redux/actions";
import { useGetUser } from "hooks";

function App() {
  const toast = useAppSelector((state) => state.toast);
  const dispatch = useAppDispatch();
  const closeModal = () => dispatch(updateToast({ ...toast, show: false }));
  const { fetchAgent } = useGetUser();

  React.useEffect(() => {
    fetchAgent();
  }, []);

  return (
    <>
      <Toast {...toast} closeModal={closeModal} />
      <MainRouter />
    </>
  );
}

export default App;
