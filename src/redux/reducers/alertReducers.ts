import { ALERT, IAlert } from "../types/alertType";
const alertReducer = (
  state: IAlert = {
    loading: false,
    success: "",
    error: "",
    clientErr: "",
    showSpinner: false,
  },
  action: any
) => {
  switch (action.type) {
    case ALERT:
 
     

      return action.payload;
    default:
      return state;
  }
};

export default alertReducer;
