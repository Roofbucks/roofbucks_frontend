import {
  reduxDropdownAction,
  DropdownState,
  dropdownActions,
} from "redux/types";

export const resetStore = () => {
  return {
    type: "RESET_APP",
  };
};

export const updateDropdown = (action: dropdownActions, data: DropdownState): reduxDropdownAction => {
  return {
    type: action,
    payload: data,
  };
};