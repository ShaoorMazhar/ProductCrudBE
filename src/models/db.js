import mongoose from "mongoose";
const mongoUrl = "mongodb://127.0.0.1:27017/productCrud";

export const connectToDB = () => {
  mongoose
    .connect(mongoUrl)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log("error>>>>>>>: ", error);
      process.exit(1);
    });
};
