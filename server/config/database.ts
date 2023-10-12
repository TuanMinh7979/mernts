import mongoose, { ConnectOptions } from "mongoose";
const uri = process.env.MONGODB_URL;
mongoose
  .connect(`${uri}`,

  )
  .then((res) => {
    console.log("connect db success");
  })
  .catch((err) => {
    console.log("connect error", err);
  });
