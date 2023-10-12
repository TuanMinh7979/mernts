import { ALERT } from "../types/alertType";
export const logError = (error: any, dispatch: any) => {

    
  if (error.response) {
    // server error
    console.log("CLIENT ERROR");
    dispatch({ type: ALERT, payload: { error: error.response.data.msg } });
  } else {
    // client error
    console.log("SERVER ERROR");
    dispatch({ type: ALERT, payload: { error: error.msg } });
  }
};
