import { combineReducers } from "redux";
import authReducer from "./authReducers";
import alertReducer from "./alertReducers";
import categoryReducer from "./categoryReducer";
export default combineReducers({
  authState: authReducer,
  alertState: alertReducer,
  categories: categoryReducer,
});
