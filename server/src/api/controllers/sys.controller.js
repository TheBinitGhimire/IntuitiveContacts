import config from "../../config/config.js";
import httpStatus from "http-status";
import moment from "moment-timezone";
import pkg from "lodash";
import User from "../models/user.model.js";
import RefreshToken from "../models/refreshToken.model.js";

const { omit } = pkg;

const generateTokenResponse = (user, accessToken) => {
  const tokenType = "Bearer";
  const refreshToken = RefreshToken.generate(user).token;
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
    return res.json({ token, user: userTransformed });
  } catch (error) {
    return next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { email, refreshToken } = req.body;
    const refreshObject = await RefreshToken.findOneAndRemove({
      userEmail: email,
      token: refreshToken,
    });
    const { user, accessToken } = await User.findAndGenerateToken({
      email,
      refreshObject,
    });
    const response = generateTokenResponse(user, accessToken);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

const sysController = { signup, signin, refresh };
export default sysController;
