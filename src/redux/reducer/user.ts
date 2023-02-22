import { reduxUserAction, UserData } from "redux/types";

const initalState: UserData = {
  role: "",
  firstName: "",
  lastName: "",
  email: "",
};

const userReducer = (state = initalState, action: reduxUserAction) => {
  switch (action.type) {
    case "UPDATE_USER":
      return action?.payload;
    default:
      return state;
  }
};

export default userReducer;
