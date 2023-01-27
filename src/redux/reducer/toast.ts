import { reduxToastAction, ToastData } from "redux/types";

const initalState: ToastData = {
  show: false,
  text: "",
  heading: "",
  type: false,
};

const toastReducer = (state = initalState, action: reduxToastAction) => {
  switch (action.type) {
    case "UPDATE_TOAST":
      return action?.payload;
    default:
      return state;
  }
};

export default toastReducer;
