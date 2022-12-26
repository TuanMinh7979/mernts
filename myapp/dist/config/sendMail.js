"use strict";
// import { OAuth2Client } from "google-auth-library";
// import SendmailTransport from "nodemailer/lib/sendmail-transport";
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
// const nodemailer = require("nodemailer");
// const OAUTH_PLAYGROUND = "link";
// const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`;
// const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`;
// const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`;
// const SENDER_EMAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;
// const sendEmail = async (to: string, url: string, txt: string) => {
//   const OAuth2ClientV = new OAuth2Client(
//     CLIENT_ID,
//     CLIENT_SECRET,
//     OAUTH_PLAYGROUND
//   );
//   OAuth2ClientV.setCredentials({ refresh_token: REFRESH_TOKEN });
//   try {
//     const access_token = await OAuth2ClientV.getAccessToken();
//     const transport = nodemailer.createTransport({
//       service: "email",
//       auth: {
//         type: "OAuth2",
//         user: SENDER_EMAIL,
//         clientId: CLIENT_ID,
//         clientSecret: CLIENT_SECRET,
//         refreshToken: REFRESH_TOKEN,
//         access_token,
//       },
//     });
//     const mailOption = {
//       from: SENDER_EMAIL,
//       to: to,
//       subject: "BLOGDEV",
//       html: "<h2>hello</h2>",
//     };
//     const result = await transport.sendMail(mailOption);
//   } catch (err) {
//     console.log(err);
//   }
// };
const sendEmail = (to, url, txt) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`SEND TO ${to} successfully ...`);
});
exports.default = sendEmail;
