//for state (must in TypeScript.ts)
export interface IAlert {
  loading?: boolean;
  success?: string | string[];
  error?: string | string[];
  clientErr?: string | string[];
  showSpinner?: boolean;
}

//for type prop of action
export const ALERT = "ALERT";

//for action type
export interface IAlertType {
  type: string;
  payload: IAlert;
}


export const NEW_TOAST = "NEW_TOAST"
export const REMOVE_TOASTS = "REMOVE_TOASTS"