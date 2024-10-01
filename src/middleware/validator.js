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
