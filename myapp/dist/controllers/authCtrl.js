"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const generateToken_1 = require("../config/generateToken");
const valid_1 = require("../middleware/valid");
const sendMail_1 = __importDefault(require("../config/sendMail"));
const authCtrl = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, account, password } = req.body;
            const user = yield userModel_1.default.findOne({ account });
            if (user) {
                return res
                    .status(400)
                    .json({ msg: "Email or phone number already exist" });
            }
            const passwordHash = yield bcrypt_1.default.hash(password, 12);
            const newUser = {
                name,
                account,
                password: passwordHash,
            };
            //active to save
            const active_token = (0, generateToken_1.generateActiveToken)({
                newUser,
            });
            if ((0, valid_1.validateEmail)(account)) {
                const url = `${process.env.BASE_URL}/active/${active_token}`;
                console.log("send mail ...");
                (0, sendMail_1.default)(account, url, "Xac nhan dia chi email");
                return res.json({ msg: "success! Please check your email" });
            }
            console.log("CONSOLE REGISTER ACTIVETOKEN", active_token);
            return res.json({
                status: "OK",
                msg: "register success",
                data: newUser,
                active_token,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error)
                return res.status(500).json({ msg: err.message });
            return res.status(500).json({ msg: err.code });
        }
    }),
    registerPro: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, account, password } = req.body;
            const user = yield userModel_1.default.findOne({ account });
            if (user) {
                return res
                    .status(400)
                    .json({ msg: "Email or phone number already exist" });
            }
            const passwordHash = yield bcrypt_1.default.hash(password, 12);
            const newUser = {
                name,
                account,
                password: passwordHash,
            };
            //active to save
            const userToSave = new userModel_1.default(newUser);
            yield userToSave.save();
            return res.json({
                status: "OK",
                msg: "register production success",
                data: newUser,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error)
                return res.status(500).json({ msg: err.message });
            return res.status(500).json({ msg: err.code });
        }
    }),
    activeAccount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { active_token } = req.body;
            console.log("CONSOLE ACTIVEACCOUNT ", active_token);
            const decode = (jsonwebtoken_1.default.verify(active_token, `${process.env.ACTIVE_SECRET}`));
            const { newUser } = decode;
            if (!newUser)
                return res.status(500).json({ msg: "Authen failed" });
            const user = new userModel_1.default(newUser);
            yield user.save();
            return res.json("actived");
        }
        catch (err) {
            console.error(err);
            if (err instanceof mongoose_1.Error)
                return res.status(500).json({ msg: err.message });
            let errMsg = "something wrong";
            if (err.code === 11000) {
                errMsg = Object.keys(err.keyValue)[0] + " already exists.";
            }
            else {
                let name = Object.keys(err.errors)[0];
                errMsg = err.errors[`${name}`].message;
            }
            return res.status(500).json({ msg: errMsg });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { account, password } = req.body;
            const user = yield userModel_1.default.findOne({ account });
            if (!user)
                return res.status(400).json({ msg: "login failed" });
            loginUser(user, password, res);
        }
        catch (err) {
            if (err instanceof mongoose_1.Error)
                return res.status(500).json({ msg: err.message });
            return res.status(500).json({ msg: err.code });
        }
    }),
    refreshToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token)
                return res.status(400).json({ msg: "Please login before" });
            console.log("------------cookie check", req.cookies);
            let a = jsonwebtoken_1.default.verify(rf_token, `${process.env.REFRESH_SECRET}`);
            const decoded = a;
            const user = yield userModel_1.default.findById(decoded.id).select("-password");
            if (!user)
                return res.status(400).json({ msg: "This account does not exist" });
            const access_token = (0, generateToken_1.generateAccessToken)({ id: user._id });
            res.json({ access_token, user });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error)
                return res.status(500).json({ msg: err.message });
            return res.status(500).json({ msg: err.code });
        }
    }),
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.clearCookie("refreshtoken");
            console.log(res.cookie);
            //react app will remove :
            // localStorage.removeItem("logged");
            return res.json({ msg: " logged out" });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error)
                return res.status(500).json({ msg: err.message });
            return res.status(500).json({ msg: err.code });
        }
    }),
};
const loginUser = (user, password, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect" });
    const access_token = (0, generateToken_1.generateAccessToken)({ id: user._id });
    const refresh_token = (0, generateToken_1.generateRefreshToken)({ id: user._id });
    res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
    });


    res.json({
        msg: "login success server msg",
        access_token,
        user: Object.assign(Object.assign({}, user._doc), { password: "" }),
    });
});
exports.default = authCtrl;
