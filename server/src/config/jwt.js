import { ExtractJwt, Strategy } from "passport-jwt";
import config from "./config.js";
import User from "../api/models/user.model.js";

const { jwtSecret } = config;

const options = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
};

const token = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if(user) return done(null, user);
    return done(null, false);
  } catch(error) {
    return done(error, false);
  }
};

const jwt = new Strategy(options, token);
export default jwt;