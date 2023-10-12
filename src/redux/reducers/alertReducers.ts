import { ALERT, IAlert} from "../types/alertType";
const alertReducer = (state: IAlert = {}, action: any) => {
  switch (action.type) {
    case ALERT:

      return action.payload;
    default:
      return state;
  }
};

export default alertReducer;
