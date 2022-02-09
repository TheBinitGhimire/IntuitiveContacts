import { Joi } from "express-validation";

const appValidations = {
  createContact: {
    body: Joi.object({
      name: Joi.string().required(),
      phone: Joi.string().required(),
      picture: Joi.string(),
      email: Joi.string().email(),
      address: Joi.string(),
    }),
  },

  updateContact: {
    body: Joi.object({
      name: Joi.string().required(),
      phone: Joi.string().required(),
      picture: Joi.string().required(),
      email: Joi.string().email(),
      address: Joi.string(),
    }),
    params: Joi.object({
      id: Joi.string().required(),
    })
  },

  deleteContact: {
    params: Joi.object({
      id: Joi.string().required(),
    })
  },
};

export default appValidations;
