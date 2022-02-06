import httpStatus from "http-status";
import Contact from "../models/contact.model.js";

const viewProfile = (req, res) => res.json(req.user.transform());

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

const appController = { viewProfile, readContacts, createContact, updateContact, deleteContact };
export default appController;
