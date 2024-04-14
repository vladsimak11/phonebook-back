const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'missing required name field'
  }),
  number: Joi.string().required().messages({
    'any.required': 'missing required phone field'
  }),
});

module.exports = {
    addSchema,
}