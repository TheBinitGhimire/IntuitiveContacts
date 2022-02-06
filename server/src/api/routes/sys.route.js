import express from "express";
import { validate } from "express-validation";
import sysController from "../controllers/sys.controller.js";
import sysValidations from "../validations/sys.validation.js";

const {
  signup: signupController,
  signin: signinController,
  refresh: refreshController,
} = sysController;
const { signup, signin, refresh } = sysValidations;

const router = express.Router();

router.route("/signup").post(validate(signup), signupController);
router.route("/signin").post(validate(signin), signinController);
router.route("/refresh").post(validate(refresh), refreshController);

export default router;
