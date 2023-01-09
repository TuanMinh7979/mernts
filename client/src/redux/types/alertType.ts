export interface IAlert {
  loading?: boolean;
  success?: string | string[];
  error?: string | string[];
}
export const ALERT = "ALERT";

export interface IAlertType {
  type: string;
  payload: IAlert;
}
