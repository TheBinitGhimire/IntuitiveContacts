import config from "../../config/config.js";
import httpStatus from "http-status";
import moment from "moment-timezone";
import pkg from "lodash";
import User from "../models/user.model.js";
import RefreshToken from "../models/refreshToken.model.js";

const { omit } = pkg;

const generateTokenResponse = (user, accessToken, refreshToken) => {
  const tokenType = "Bearer";
  if (!refreshToken) refreshToken = RefreshToken.generate(user).token;
  const expiresIn = moment().add(config.jwtTime, "minutes");
  return {
    tokenType,
    accessToken,
    refreshToken,
    expiresIn,
  };
};

const signup = async (req, res, next) => {
  try {
    const userData = omit(req.body, "role");
    const user = await new User(userData).save();
    const userTransformed = user.transform();
    const token = generateTokenResponse(user, user.token());
    res.status(httpStatus.CREATED);
    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.json({ token, user: userTransformed });
  } catch (error) {
    return next(User.checkDuplicateEmail(error));
  }
};

const signin = async (req, res, next) => {
  try {
    const { user, accessToken } = await User.findAndGenerateToken(req.body);
    const token = generateTokenResponse(user, accessToken);
    const userTransformed = user.transform();
    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.json({ token, user: userTransformed });
  } catch (error) {
    return next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { email, refreshToken } = req.body;
    const refreshObject = await RefreshToken.findOne({
      userEmail: email,
      token: refreshToken,
    });
    const { user, accessToken } = await User.findAndGenerateToken({
      email,
      refreshObject,
    });
    const response = generateTokenResponse(user, accessToken, refreshToken);
    res.cookie("refreshToken", response.refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("refreshToken", { path: "/api/sys/refresh" });
    return res.json({ message: "Logged out!" });
  } catch (error) {
    return next(error);
  }
};

const sysController = { signup, signin, refresh, logout };
export default sysController;
