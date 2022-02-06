import mongoose from "mongoose";
import crypto from "crypto";
import moment from "moment-timezone";

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    index: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userEmail: {
    type: "String",
    ref: "User",
    required: true,
  },
  expires: { type: Date },
});

refreshTokenSchema.statics = {
  generate(user) {
    const userID = user._id;
    const userEmail = user.email;
    const token = `${userID}.${crypto.randomBytes(40).toString("hex")}`;
    const expires = moment().add(30, "days").toDate();
    const tokenObject = new RefreshToken({
      token,
      userID,
      userEmail,
      expires,
    });
    tokenObject.save();
    return tokenObject;
  },
};

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
export default RefreshToken;
