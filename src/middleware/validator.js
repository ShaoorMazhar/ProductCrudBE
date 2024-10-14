import Joi from "joi";
import { FailureResponse } from "../common.js";

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema().validate(req.body);
    if (error) {
      return res
        .status(400)
        .json(FailureResponse(error.details[0].message, 400));
    }
    next();
  };
};

export const productSchema = () =>
  Joi.object({
    title: Joi.string().required(),
    amount: Joi.number().strict().required(),
  });

export const registerUserSchema = () => {
  return Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
};

export const signInUserSchema = () => {
  return Joi.object({
    email: Joi.string().email(),
    password: Joi.string(),
  });
};
