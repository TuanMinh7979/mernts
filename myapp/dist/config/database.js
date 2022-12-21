"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uri = process.env.MONGODB_URL;
mongoose_1.default
    .connect(`${uri}`)
    .then((res) => {
    console.log("connect db success");
})
    .catch((err) => {
    console.log("connect error", err);
});
