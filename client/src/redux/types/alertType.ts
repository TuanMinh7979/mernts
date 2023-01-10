//for state (must in TypeScript.ts)
export interface IAlert {
  loading?: boolean;
  success?: string | string[];
  error?: string | string[];
}
export const ALERT = "ALERT";

//for action type
export interface IAlertType {
  type: string;
  payload: IAlert;
}
