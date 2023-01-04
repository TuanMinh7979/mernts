import { ALERT } from "../types/alertType";
import { IAlert } from "../../TypeScript";
const alertReducer = (state: IAlert = {}, action: any) => {
  switch (action.type) {
    case ALERT:

      return action.payload;
    default:
      return state;
  }
};

export default alertReducer;
