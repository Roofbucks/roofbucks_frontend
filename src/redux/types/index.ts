/**
 * Dropdown State
 */
export interface DropdownState {
  show: boolean;
}

export type dropdownActions = "DROPDOWN";

export interface reduxDropdownAction {
  type: dropdownActions;
  payload: any;
}

/**
 * User State
 */
export interface UserData {
  role: "agent" | "shareholder" | "";
  email: string;
  firstName: string;
  lastName: string;
}

export type userActions = "UPDATE_USER";

export interface reduxUserAction {
  type: userActions;
  payload: UserData;
}

/**
 * Toast State
 */
export interface ToastData {
  heading: string;
  text: string;
  show: boolean;
  type: boolean;
}

export type toastActions = "UPDATE_TOAST";

export interface reduxToastAction {
  type: toastActions;
  payload: ToastData;
}
