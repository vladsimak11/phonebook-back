const express = require("express");
const router = express.Router();

const { isValidId, validateBody, authenticate} = require("../../middlewares");
const schemas = require("../../validator/contacts");

const {
  listContacts,
  addContact,
  removeContact,
} = require("../../controllers/contacts");

router.get("/", authenticate, listContacts);

router.post("/", authenticate, validateBody(schemas.addSchema), addContact);

router.delete('/:contactId', authenticate, isValidId, removeContact);


module.exports = router;
