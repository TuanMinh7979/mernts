import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Error } from "mongoose";
import {
  generateActiveToken,
  generateAccessToken,
  generateRefreshToken,
} from "../config/generateToken";
import { validateEmail } from "../middleware/valid";
import sendEmail from "../config/sendMail";
import {
  INewUser,
  IDecodedToken,
  IUser,
  IUserParams,
  IGgPayload,
} from "../config/interface";
import { OAuth2Client } from "google-auth-library";

const CLIENT_URL = `${process.env.BASE_URL}`;
const client = new OAuth2Client(`${process.env.MAIL_CLIENT_ID}`);
const authCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;

      const user = await User.findOne({ account });
      if (user) {
        return res
          .status(400)
          .json({ msg: "Email or phone number already exist" });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        account,
        password: passwordHash,
      };

      const active_token = generateActiveToken({ newUser });

      const url = `${CLIENT_URL}/active/${active_token}`;

      if (validateEmail(account)) {
        console.log("sendddddddddddddddddddddMAIL");
        sendEmail(account, url, "Verify your email address");
        console.log("CONSOLE REGISTER ACTIVETOKEN", active_token);

        return res.json({
          msg: "Success! Please check your email and active account after that",
        });
      }

      const newUserToSave = new User(newUser);
      await newUserToSave.save();

      return res.json({
        status: "OK",
        msg: "register success 123232",
        data: newUser,
        active_token,
      });
    } catch (err: any) {
      if (err instanceof Error)
        return res.status(500).json({ msg: err.message });
      return res.status(500).json({ msg: err.code });
    }
  },
  registerPro: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;

      const user = await User.findOne({ account });
      if (user) {
        return res
          .status(400)
          .json({ msg: "Email or phone number already exist" });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        account,
        password: passwordHash,
      };
      //active to save

      const userToSave = new User(newUser);
      await userToSave.save();

      return res.json({
        status: "OK",
        msg: "register production success",
        data: newUser,
      });
    } catch (err: any) {
      if (err instanceof Error)
        return res.status(500).json({ msg: err.message });
      return res.status(500).json({ msg: err.code });
    }
  },

  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;
      console.log("CONSOLE ACTIVEACCOUNT ", active_token);
      const decode = <IDecodedToken>(
        jwt.verify(active_token, `${process.env.ACTIVE_SECRET}`)
      );
      const { newUser } = decode;
      console.log(
        "000",
        jwt.verify(active_token, `${process.env.ACTIVE_SECRET}`)
      );
      if (!newUser) return res.status(500).json({ msg: "Authen failed" });

      const user = new User(newUser);
      await user.save();
      return res.json("actived");
    } catch (err: any) {
      console.error(err);
      if (err instanceof Error)
        return res.status(500).json({ msg: err.message });

      let errMsg = "something wrong";
      if (err && err.code === 11000) {
        errMsg = Object.keys(err.keyValue)[0] + " already exists.";
      } else if (err && err.errors) {
        console.log("ERR WHEN ACTIVE1", err);
        let name = Object.keys(err.errors)[0];
        errMsg = err.errors[`${name}`].message;
      } else {
        console.log("ERR WHEN ACTIVE2", err);
      }

      return res.status(500).json({ msg: errMsg });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body;

      const user = await User.findOne({ account });
      if (!user) return res.status(400).json({ msg: "login failed" });

      loginUser(user, password, res);
    } catch (err: any) {
      if (err instanceof Error)
        return res.status(500).json({ msg: err.message });
      return res.status(500).json({ msg: err.code });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    //neu da dang nhap thi moi lan truy cap ung dung(dispath reload page lam moi) se co 1 token khac nhau duoc lam moi
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please login before" });

      console.log("------------cookie check", req.cookies);
      let a = jwt.verify(rf_token, `${process.env.REFRESH_SECRET}`);

      const decoded = <IDecodedToken>a;
      const user = await User.findById(decoded.id).select("-password");
      if (!user)
        return res.status(400).json({ msg: "This account does not exist" });
      const access_token = generateAccessToken({ id: user._id });
      res.json({ access_token, user });
    } catch (err: any) {
      if (err instanceof Error)
        return res.status(500).json({ msg: err.message });
      return res.status(500).json({ msg: err.code });
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie('refreshtoken', { path: `/api/refresh_token` })
      console.log(res.cookie);

      return res.json({ msg: " logged out" });
    } catch (err: any) {
      if (err instanceof Error)
        return res.status(500).json({ msg: err.message });
      return res.status(500).json({ msg: err.code });
    }
  },

  googleLogin: async (req: Request, res: Response) => {
    try {
      console.log(">>>>>>>>>>>>>>> ", req.body);

      const { id_token } = req.body;
      const verify = await client.verifyIdToken({
        idToken: id_token,
        audience: `${process.env.MAIL_CLIENT_ID}`,
      });

      const { email, email_verified, name, picture } = <IGgPayload>(
        verify.getPayload()
      );
      console.log( "user info: ", email, email_verified, name, picture)

      if (!email_verified)
        return res.status(500).json({ msg: "Email verification failed." });

      const password = email + "your google secrect password";
      const passwordHash = await bcrypt.hash(password, 12);

      const user = await User.findOne({ account: email });

      //IF USER REGISTERD THI LOGIN LUON 
      if (user) {
        console.log("DANG NHAP NGAY")
        loginUser(user, password, res)
      } else {
        console.log("DANG KY TRUOC KHI DANG NHAP")
        //KHONG THI DANG KY TAI KHOAN MOI
        const user = {
          name,
          account: email,
          password: passwordHash,
          avatar: picture,
          type: "google",
        };
        registerUser(user, res);
      }
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const loginUser = async (user: IUser, password: string, res: Response) => {
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Password is incorrect" });

  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id });
  res.cookie('refreshtoken', refresh_token, {
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30*24*60*60*1000 // 30days
  })

  res.json({
    msg: 'Login Success!',
    access_token,
    user: { ...user._doc, password: '' }
  })
};

const registerUser = async (user: IUserParams, res: Response) => {
  const newUser = new User(user);
  await newUser.save();

  const access_token = generateAccessToken({ id: newUser._id });
  const refresh_token = generateRefreshToken({ id: newUser._id });

  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
  });

  res.json({
    msg: "Login Success!",
    access_token,
    user: { ...newUser._doc, password: "" },
  });
};

export default authCtrl;
