import { CombinedState, combineReducers } from "redux";
import {
  dropdownActions,
  DropdownState,
  toastActions,
  ToastData,
  userActions,
  UserData,
} from "redux/types";
import { dropdownReducer } from "./dropdown";
import userReducer from "./user";
import toastReducer from "./toast";

const allReducers = combineReducers({
  dropdown: dropdownReducer,
  user: userReducer,
  toast: toastReducer,
});

export type RootReducerState =
  | CombinedState<{
      dropdown: DropdownState;
      user: UserData;
      toast: ToastData;
    }>
  | undefined;

export type RootReducerAction =
  | CombinedState<{
      dropdown: dropdownActions;
      user: userActions;
      toast: toastActions;
    }>
  | any;

const rootReducer = (state: RootReducerState, action: RootReducerAction) => {
  if (action.type === "RESET_APP") {
    state = undefined;
  }
  return allReducers(state, action);
};

export default rootReducer;
