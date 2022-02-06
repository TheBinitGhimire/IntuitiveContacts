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
    required: true,
    trim: true,
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    trim: true,
    lowercase: true,
  },
  address: {
    type: String,
    maxlength: 512,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;