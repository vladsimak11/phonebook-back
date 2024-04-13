const { Contact } = require("../models/contact");

const { HttpError } = require("../helpers");

const listContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).sort({'createdAt': -1});
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { _id: owner} = req.user;
    const result = await Contact.create({...req.body, owner});

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json({
      id: contactId,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  addContact,
  removeContact,
};
