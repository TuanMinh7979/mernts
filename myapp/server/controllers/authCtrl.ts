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
  IReqAuth,
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
  logout: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid authentication" });
    try {
      res.clearCookie("refreshtoken", { path: `/api/refresh_token` });
      console.log("COOKIE NOW", res.cookie);
      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          rf_token: "",
        }
      );

      return res.json({ msg: " logged out" });
    } catch (err: any) {
      if (err instanceof Error)
        return res.status(500).json({ msg: err.message });
      return res.status(500).json({ msg: err.code });
    }
  },

  googleLogin: async (req: Request, res: Response) => {
    try {
      const { id_token } = req.body;
      const verify = await client.verifyIdToken({
        idToken: id_token,
        audience: `${process.env.MAIL_CLIENT_ID}`,
      });

      const { email, email_verified, name, picture } = <IGgPayload>(
        verify.getPayload()
      );
      console.log("user info: ", email, email_verified, name, picture);

      if (!email_verified)
        return res.status(500).json({ msg: "Email verification failed." });

      const password = email + "your google secrect password";
      const passwordHash = await bcrypt.hash(password, 12);

      const user = await User.findOne({ account: email });

      //IF USER REGISTERD THI LOGIN LUON
      if (user) {
        console.log("DANG NHAP NGAY");
        loginUser(user, password, res);
      } else {
        console.log("DANG KY TRUOC KHI DANG NHAP");
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

  refreshToken: async (req: Request, res: Response) => {
    console.log(">>>REFRESH CALLL");
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res
          .status(400)
          .json({ msg: "Please login now(dont have token)!" });

      const decoded = <IDecodedToken>(
        jwt.verify(rf_token, `${process.env.REFRESH_SECRET}`)
      );
      if (!decoded.id)
        return res.status(400).json({ msg: "Please login now!" });

      const user = await User.findById(decoded.id).select(
        "-password +rf_token"
      );
      if (!user)
        return res.status(400).json({ msg: "This account does not exist." });

      console.log(
        ">>>",
        rf_token,
        "---",
        user.rf_token,
        "...=",
        rf_token === user.rf_token
      );
      if (rf_token !== user.rf_token)
        return res
          .status(400)
          .json({ msg: "Please login now(token not valid)!" });

      const access_token = generateAccessToken({ id: user._id });
      const refresh_token = generateRefreshToken({ id: user._id }, res);

      await User.findOneAndUpdate(
        { _id: user._id },
        {
          rf_token: refresh_token,
        }
      );

      console.log(">>>REFRESH END");
      res.json({ access_token, user });
    } catch (err: any) {
      console.log("REFRESH ERR", err);
      return res.status(500).json({ msg: err.message });
    }
  },
};

// const loginUser = async (user: IUser, password: string, res: Response) => {

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ msg: "Password is incorrect" });

//   const access_token = generateAccessToken({ id: user._id });
//   const refresh_token = generateRefreshToken({ id: user._id }, res);

//   const newUpdateUser = await User.findOneAndUpdate(
//     { _id: user._id },
//     {
//       $set: {
//         rf_token: refresh_token,
//       },
//     },
//     { new: true }
//   );

//   res.cookie("refreshtoken", refresh_token, {
//     httpOnly: true,
//     path: `/api/refresh_token`,
//     maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
//   });
//   if (newUpdateUser) {
//     res.json({
//       msg: "Login Success!",
//       access_token,
//       user: { ...newUpdateUser._doc, password: "" },
//     });
//   } else {
//     return res.status(500).json({ msg: "Update failed." });
//   }
// };

const loginUser = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    let msgError =
      user.type === "register"
        ? "Password is incorrect."
        : `Password is incorrect. This account login with ${user.type}`;

    return res.status(400).json({ msg: msgError });
  }

  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id }, res);

  await User.findOneAndUpdate(
    { _id: user._id },
    {
      rf_token: refresh_token,
    }
  );

  console.log(
    "_________________________LOGIN SUCCESS___________________________"
  );
  res.json({
    msg: "Login Success!",
    access_token,
    user: { ...user._doc, password: "" },
  });
};

const registerUser = async (user: IUserParams, res: Response) => {
  //only use for google login
  const newUser = new User(user);

  const access_token = generateAccessToken({ id: newUser._id });
  const refresh_token = generateRefreshToken({ id: newUser._id }, res);

  newUser.rf_token = refresh_token;
  await newUser.save();

  res.json({
    msg: "Login Success!",
    access_token,
    user: { ...newUser._doc, password: "" },
  });
};

export default authCtrl;
