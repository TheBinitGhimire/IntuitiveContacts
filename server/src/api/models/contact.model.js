import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 128,
    index: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    trim: true,
    default: "https://res.cloudinary.com/binit/image/upload/v1644233860/IntuitiveContacts/profile_ya4nx1.png",
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    trim: true,
    lowercase: true,
    default: "not@provided.me"
  },
  address: {
    type: String,
    maxlength: 512,
    trim: true,
    default: "Not provided!"
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;