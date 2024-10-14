import Express from "express";

import {
  regeisterNewUserController,
  signinUserController,
} from "../controllers/users.js";
import {
  validateRequest,
  registerUserSchema,
  signInUserSchema,
} from "../middleware/validator.js";
const userRoutes = Express.Router();

userRoutes
  .route("/signup")
  .post(validateRequest(registerUserSchema), regeisterNewUserController);
userRoutes
  .route("/sigin")
  .post(validateRequest(signInUserSchema), signinUserController);

export default userRoutes;
