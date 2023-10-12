import { OAuth2Client } from "google-auth-library";

const nodemailer = require("nodemailer");
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";
const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`;

const SENDER_EMAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;

const sendEmail = async (to: string, url: string, txt: string) => {
  const OAuth2ClientV = new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    OAUTH_PLAYGROUND
  );
  OAuth2ClientV.setCredentials({ refresh_token: REFRESH_TOKEN });
  try {
    const access_token = await OAuth2ClientV.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SENDER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        access_token,
      },
    });

    const mailOption = {
      from: SENDER_EMAIL,
      to: to,
      subject: "BLOGDEV",
      html: `
      <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
      <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the DevAT channel.</h2>
      <p>Congratulations! You're almost set to start using BlogDEV.
          Just click the button below to validate your email address.
      </p>
      
      <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
  
      <p>If the button doesn't work for any reason, you can also click on the link below:</p>
  
      <div>${url}</div>
      </div>`,
    };
    const result = await transport.sendMail(mailOption);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export default sendEmail;
