import * as React from "react";
import { MainRouter } from "./router";
import { Toast } from "components";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { updateToast } from "redux/actions";
import { useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();
  const toast = useAppSelector((state) => state.toast);
  const dispatch = useAppDispatch();
  const closeModal = () => dispatch(updateToast({ ...toast, show: false }));

  // React.useEffect(() => {
  //   dispatch(
  //     updateToast({
  //       show: false,
  //       heading: "",
  //       text: "",
  //       type: true,
  //     })
  //   );
  // }, [pathname]);

  return (
    <>
      <Toast {...toast} closeModal={closeModal} />
      <MainRouter />
    </>
  );
}

export default App;
