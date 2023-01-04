import { IUser } from "../../TypeScript";
export const AUTH = "AUTH";

//for state
export interface IAuth {
  msg?: string;
  access_token?: string;
  user?: IUser;
}

//for correspond action
export interface IAuthType {
  type: typeof AUTH;
  payload: IAuth;
}
