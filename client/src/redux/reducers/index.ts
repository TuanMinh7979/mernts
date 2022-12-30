import { combineReducers } from "redux";
import authReducer from "./authReducers";
import alertReducer from "./alertReducers";
export default combineReducers({
  authState: authReducer,
  alertState: alertReducer,
});
