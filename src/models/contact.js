const {Schema, model} = require("mongoose");

const {handleMongooseError} = require("../helpers");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  number: {
    type: String,
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, {versionKey: false, timestamps: true});

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
}