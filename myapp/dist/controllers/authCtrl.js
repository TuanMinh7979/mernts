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
        }
    }),
    activeAccount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { active_token } = req.body;
            const decode = (jsonwebtoken_1.default.verify(active_token, `${process.env.ACTIVE_SECRET}`));
            const { newUser } = decode;
            if (!newUser)
                return res.status(500).json({ msg: "Authen failed" });
            const user = new userModel_1.default(newUser);
            yield user.save();
            return res.json("actived");
        }
        catch (err) {
            let errMsg;
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
};
exports.default = authCtrl;
