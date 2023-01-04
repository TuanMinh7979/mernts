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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.validatePhone = exports.validRegister = void 0;
const validRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, account, password } = req.body;
    const errs = [];
    if (!name) {
        errs.push("please add your name");
    }
    else if (name.length > 20) {
        errs.push("please check your name length");
    }
    if (!account) {
        errs.push("please add your email or phone number");
    }
    else if (!(0, exports.validatePhone)(account) && !(0, exports.validateEmail)(account)) {
        errs.push("please check your account format");
    }
    if (password.length < 6) {
        errs.push("password must be at least 6 chars");
    }
    if (errs.length > 0) {
        return res.status(400).json({ msg: errs });
    }
    else {
        return next();
    }
});
exports.validRegister = validRegister;
const validatePhone = (phone) => {
    const re = /^[+]/g;
    return re.test(phone);
};
exports.validatePhone = validatePhone;
const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
exports.validateEmail = validateEmail;
