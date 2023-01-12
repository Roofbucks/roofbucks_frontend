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

export interface User {
  type: "agent" | "shareholder",
  id: string;
  name: string;
}