import pkg from "bluebird";
import httpStatus from "http-status";
import passport from "passport";
import User from "../models/user.model.js";
import APIError from "../errors/api.error.js";

const { Promise } = pkg;

export const LOGGED_USER = "_loggedUser";

const handleJWT = (req, res, next, roles) => async (err, user, info) => {
  const error = err || info;
  const logIn = Promise.promisify(req.logIn);
  const apiError = new APIError({
    message: error ? error.message : "Unauthorized",
    status: httpStatus.UNAUTHORIZED,
    stack: error ? error.stack : undefined,
  });

  try {
    if (error || !user) throw error;
    await logIn(user, { session: false });
  } catch (e) {
    return next(apiError);
  }

  if (roles !== LOGGED_USER && !roles.includes(user.role)) {
    apiError.status = httpStatus.FORBIDDEN;
    apiError.message = "Forbidden | No such user roles!";
    return next(apiError);
  } else if (err || !user) {
    return next(apiError);
  }

  req.user = user;

  return next();
};

export const authorize = (roles = User.userRoles) => (req, res, next) => {
  return passport.authenticate(
    "jwt", {
      session: false
    },
    handleJWT(req, res, next, roles)
  )(req, res, next);
};