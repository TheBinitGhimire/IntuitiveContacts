import express from "express";
import { validate } from "express-validation";
import fileUpload from "../../config/multer.js";
import { authorize, LOGGED_USER } from "../middlewares/auth.js";
import appController from "../controllers/app.controller.js";
import appValidations from "../validations/app.validation.js";

const { createContact, updateContact, deleteContact } = appValidations;

const router = express.Router();

router.route("/profile").get(authorize(), appController.viewProfile);

router
  .route("/uploadImage")
  .post(authorize(), fileUpload.single("image"), appController.uploadImage);

router
  .route("/contacts")
  .get(authorize(LOGGED_USER), appController.readContacts)

  .post(
    authorize(LOGGED_USER),
    validate(createContact),
    appController.createContact
  );

router
  .route("/contacts/:id")
  .get(
    authorize(LOGGED_USER),
    appController.viewContact
  )

  .put(
    authorize(LOGGED_USER),
    validate(updateContact),
    appController.updateContact
  )

  .delete(
    authorize(LOGGED_USER),
    validate(deleteContact),
    appController.deleteContact
  );

export default router;
