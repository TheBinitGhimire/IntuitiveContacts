import httpStatus from "http-status";
import cloudinary from "../../config/cloudinary.js";

import Contact from "../models/contact.model.js";

const viewProfile = (req, res) => res.json(req.user.transform());

const uploadImage = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "IntuitiveContacts/ProfileImages/",
    });
    const resize = cloudinary.url(result.public_id, {
      width: 256,
      height: 256,
      gravity: "faces",
      crop: "fill",
    });
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ imageURL: resize });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const viewContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, author: req.user._id });
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const readContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ author: req.user._id });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const contactInformation = req.body;
    Object.assign(contactInformation, { author: req.user._id });
    const newContact = await new Contact(contactInformation).save();
    res.status(httpStatus.CREATED);
    res.json(newContact);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  Contact.findOneAndUpdate(
    { _id: req.params.id, author: req.user._id },
    { $set: req.body },
    { new: true },
    (err, doc) => {
      if (err) {
        next(err);
      } else res.send(doc);
    }
  );
};

const deleteContact = async (req, res, next) => {
  Contact.findOneAndRemove(
    { _id: req.params.id, author: req.user._id },
    (err) => {
      if (err) next(err);
      else res.send("The contact has been deleted successfully");
    }
  );
};

const appController = {
  viewProfile,
  uploadImage,
  viewContact,
  readContacts,
  createContact,
  updateContact,
  deleteContact,
};
export default appController;
