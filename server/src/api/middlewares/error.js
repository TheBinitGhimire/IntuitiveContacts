import httpStatus from "http-status";
import { ValidationError } from "express-validation";
import APIError from "../errors/api.error.js";
const { env } = require("../../config/config.js");

const handler = (err, req, res) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  if (env !== "development") {
    delete response.stack;
  }

  res.status(err.status);
  res.json(response);
};

export default handler;

export const converter = (err, req, res) => {
  let convertedError = err;

  if (err instanceof ValidationError) {
    convertedError = new APIError({
      message: "Validation Error",
      errors: err.errors,
      status: err.status,
      stack: err.stack,
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }

  return handler(convertedError, req, res);
};

export const notFound = (req, res) => {
  const err = new APIError({
    message: "Not Found!",
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};
