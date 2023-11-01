import { NEW_TOAST, REMOVE_TOASTS } from "../types/alertType";



const toastIcons = [
  { success: checkIcon, color: "#5cb85c" },
  { error: errorIcon, color: "#d9534f" },
  { info: infoIcon, color: "#5bc0de" },
  { clientError: errorIcon, color: "orange" },
];
const ToastReducer = (state: any = [], action: any) => {
  switch (action.type) {
    case NEW_TOAST:
      console.log("-------------------add new tost");

      const { message, type } = action.payload;
      const toastItem = {
        id: state.length,
        description: message,
        type,
        backgroundColor: "green",
      };

      //   them vao dau list
      let newList = [...state];
      newList.unshift(toastItem);

      return newList;
    case REMOVE_TOASTS:
      return [];
    default:
      return state;
  }
};

export default ToastReducer;
