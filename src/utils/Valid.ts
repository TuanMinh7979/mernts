
import { IUserRegister, IBlog } from "../TypeScript";
export const ValidRegister = (data: IUserRegister) => {
  const { name, account, password, cf_password } = data;
  const errs: string[] = [];
  if (!name) {
    errs.push("please add your name");
  } else if (name.length > 20) {
    errs.push("Name must be less than 20 chars");
  }

  const msg = checkPassword(password, cf_password);
  if (msg) errs.push(msg);
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

export const checkPassword = (password: string, cf_password: string) => {
  if (password.length < 6) {
    return "password must be at least 6 chars";
  } else if (password !== cf_password) {
    return "Confirm password not match";
  }
};

//valid blcog
export const validCreateBlog = ({
  title,
  content,
  description,
  thumbnail,
  category,
}: IBlog) => {
  const err: string[] = [];
  if (title.trim().length < 10) {
    err.push("Title has at least 10 characters.");
  } else if (title.trim().length > 50) {
    err.push("Title is up to 50 characters long.");
  }

  if (content.trim().length < 200) {
    err.push("Content has at least 200 characters.");
  }

  if (description.trim().length < 50) {
    err.push("Description has at least 50 characters.");
  } else if (description.trim().length > 200) {
    err.push("Description is up to 200 characters long.");
  }

  if (!thumbnail) {
    err.push("Thumbnail cannot be left blank.");
  }

  if (!category) {
    err.push("Category cannot be left blank.");
  }

  return {
    errMsg: err,
    errLen: err.length,
  };
};

//shallow equality
export const shallowEqual = (object1: any, object2: any) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
};
