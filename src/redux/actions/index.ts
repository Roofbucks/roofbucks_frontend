import {
  reduxDropdownAction,
  DropdownState,
  dropdownActions,
  UserData,
  reduxUserAction,
  ToastData,
  reduxToastAction,
} from "redux/types";

export const resetStore = () => {
  return {
    type: "RESET_APP",
  };
};

export const updateDropdown = (
  action: dropdownActions,
  data: DropdownState
): reduxDropdownAction => {
  return {
    type: action,
    payload: data,
  };
};

export const updateUser = (data: UserData): reduxUserAction => {
  return {
    type: "UPDATE_USER",
    payload: data,
  };
};

export const updateToast = (data: ToastData): reduxToastAction => {
  return {
    type: "UPDATE_TOAST",
    payload: data,
  };
};
