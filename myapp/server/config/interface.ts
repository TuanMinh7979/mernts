import { Document, StringSchemaDefinition } from "mongoose";
import { Request } from "express";
export interface INewUser {
  name: string;
  account: string;
  password: string;
}

export interface IDecodedToken {
  id?: string;
  newUser?: INewUser;
  iat: number;
  exp: number;
}

export interface IUser extends Document {
  name: string;
  account: string;
  password: string;
  avatar: string;
  role: string;
  type: string;
  _doc: object;
}
export interface IReqAuth extends Request {
  user?: IUser;
}

export interface IUserParams {
  name: string 
  account: string 
  password: string
  avatar?: string
  type: string
}

export interface IGgPayload {
  email: string
  email_verified: boolean
  name: string
  picture: string
}
export interface IComment extends Document{
  user: string
  blog_id: string
  blog_user_id: string
  content: string
  replyCM: string[]
  reply_user: string
  _doc: object
}


