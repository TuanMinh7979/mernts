import { ErrorResponse } from "@remix-run/router";
import { isNullishCoalesce } from "typescript";
import { IUserRegister } from "../TypeScript";
export const ValidRegister = (data: IUserRegister) => {
  const { name, account, password, cf_password } = data;
  const errs: string[] = [];
  if (!name) {
    errs.push("please add your name");
  } else if (name.length > 20) {
    errs.push("please check your name length");
  }
  if (!account) {
    errs.push("please add your email or phone number");
  } else if (!validatePhone(account) && !validateEmail(account)) {
    errs.push("please check your account format");
  }

  if (password.length < 6) {
    errs.push("password must be at least 6 chars");
  } else if (password !== cf_password) {
    errs.push("Cofirm password did not match");
  }

  return {
    errMsg: errs,
    errLength: errs.length,
  };
};

export const validatePhone = (phone: string) => {
  const re = /^[+]/g;
  return re.test(phone);
};
export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
