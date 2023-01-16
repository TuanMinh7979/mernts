//for state (must in TypeScript.ts)
export interface IAlert {
  loading?: boolean;
  success?: string | string[];
  error?: string | string[];
}

//for type prop of action
export const ALERT = "ALERT";

//for action type
export interface IAlertType {
  type: string;
  payload: IAlert;
}
