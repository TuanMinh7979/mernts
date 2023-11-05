import {
  IToastState,
  NEW_TOAST,
  REMOVE_TOASTS,
  SHOW_LOADING,
  SHOW_SPINNER,
  STOP_LOADING,
  STOP_SPINNER,
} from "../types/toastType";
import checkIcon from "../../assets/icons/check.svg";
import errorIcon from "../../assets/icons/error.svg";
import infoIcon from "../../assets/icons/info.svg";
import warningIcon from "../../assets/icons/warning.svg";
import { uniqBy } from "lodash";

interface ToastIcon {
  type: string;
  icon: any;
  color: string;
}
const toastIcons = [
  { type: "success", icon: checkIcon, color: "#5cb85c" },
  { type: "error", icon: errorIcon, color: "#d9534f" },
  { type: "info", icon: infoIcon, color: "#5bc0de" },
  { type: "clientError", icon: errorIcon, color: "crimson" },
  { type: "warning", icon: warningIcon, color: "#orange" },
];

const initState = {
  loading: false,
  showSpinner: false,
  toasts: [],
};

const ToastReducer = (state: IToastState = initState, action: any) => {
  switch (action.type) {
    case NEW_TOAST:
      const { message, type } = action.payload;
      console.log(">>>>>>>>>>>>>>", action.payload);

      const toastIconObject = toastIcons.find(
        (item) => item.type == type
      ) as unknown as ToastIcon;

      const toastItem = {
        id: state.toasts ? state.toasts.length : 0,
        description: message,
        type,
        icon: toastIconObject.icon,
        backgroundColor: toastIconObject.color,
      };

      let newList = state.toasts ? [...state.toasts] : [];

      newList.unshift(toastItem);
      newList = [...uniqBy(newList, "description")];

      return { loading: false, showSpinner: false, toasts: newList };
    case REMOVE_TOASTS:
      return { ...state, toasts: [] };
    case SHOW_LOADING:
      return { ...state, loading: true };
    case STOP_LOADING:
      return { ...state, loading: false };
    case SHOW_SPINNER:
      return { ...state, loading: true, showSpinner: true };
    case STOP_SPINNER:
      return { ...state, loading: false, showSpinner: false };
    default:
      return state;
  }
};

export default ToastReducer;
