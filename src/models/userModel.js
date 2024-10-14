import mongoose from "mongoose";

const userRegisterationSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
const registerationModel = mongoose.model("users", userRegisterationSchema);

export default registerationModel;
