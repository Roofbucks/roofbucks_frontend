import { DropdownState, reduxDropdownAction } from "redux/types";

const initialState: DropdownState = {
  show: false,
};

const dropdownReducer = (state = initialState, action: reduxDropdownAction) => {
  switch (action.type) {
    case "DROPDOWN":
      return action?.payload;
    default:
      return state;
  }
};

export { dropdownReducer };
