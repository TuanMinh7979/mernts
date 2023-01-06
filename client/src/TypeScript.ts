import { ChangeEvent, FormEvent } from "react";
import rootReducer from "./redux/reducers";
export type InputChange = ChangeEvent<HTMLInputElement>;

export type FormSubmit = FormEvent<HTMLFormElement>;

export interface IParams {
  page: string;
  slug: string;
}

export interface IUserLogin {
  account: string;
  password: string;
}

export interface IUser extends IUserLogin {
  avatar: string ;
  createdAt: string;
  name: string;
  role: string;
  type: string;
  updatedAt: string;
  _id: string;
}


export interface IAlert {
  loading?: boolean;
  success?: string | string[];
  error?: string | string[];
}

export interface IUserRegister extends IUserLogin {
  name: string;
  // account: string;
  // password: string;
  cf_password: string;
}

export interface IUserProfile extends IUserRegister{
  avatar: string | File
}

export type RootStore = ReturnType<typeof rootReducer>;
