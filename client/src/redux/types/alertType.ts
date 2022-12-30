import { IAlert } from "../../TypeScript";

export const ALERT = "ALERT";

export interface IAlertType {
  type: string;
  payload: IAlert;
}
