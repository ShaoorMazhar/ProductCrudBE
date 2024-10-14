import { SuccessResponse, FailureResponse } from "../common.js";
import { UserService } from "../services.js";

export const regeisterNewUserController = async (req, res) => {
  try {
    const service = new UserService();
    const newUser = await service.registerUser(req);
    if (!newUser) {
      res.status(400).json(FailureResponse("User already existed", 400));
    } else {
      res.json(SuccessResponse("User created successfully", 200, newUser));
    }
  } catch (error) {
    res.status(500).json(FailureResponse("User not registerd", 500));
  }
};

export const signinUserController = async (req, res) => {
  try {
    const service = new UserService();
    const login = await service.siginUser(req);
    if (login === "notFound") {
      res.status(400).json(FailureResponse("User does not exist", 400));
    } else if (login === "passIncorrect") {
      res.status(400).json(FailureResponse("Incorrect Password", 400));
    } else {
      res.json(SuccessResponse("User logged in successfully", 200, login));
    }
  } catch (error) {
    res.status(500).json(FailureResponse("Something went wrong", 500));
  }
};
