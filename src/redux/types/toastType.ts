
export interface IToastState {
  loading?: boolean;
  showSpinner?: boolean;
  toasts?: IToast[];
}

export interface IToast {
  type: string;
  icon: any;
  id: string | number;
  description: string | [];
  backgroundColor: string;
}
export interface IToastDispatchType {
  type: string;
  payload: IToastState;
}

export const NEW_TOAST = "NEW_TOAST";
export const REMOVE_TOASTS = "REMOVE_TOASTS";
export const SHOW_LOADING = "SHOW_LOADING";
export const STOP_LOADING = "STOP_LOADING";
export const SHOW_SPINNER="SHOW_SPINNER"
export const STOP_SPINNER="STOP_SPINNER"
