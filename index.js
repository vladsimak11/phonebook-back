const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const { DB_HOST, PORT = 3001} = process.env;

const contactsRouter = require('./src/routes/api/contacts');
const authRouter = require('./src/routes/api/auth');

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use('/contacts', contactsRouter);
app.use('/users', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({ message, })
});

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful! Port: ${PORT}`)
    });
  })
  .catch( error => {
    console.log(error.message);
    process.exit(1);
  });