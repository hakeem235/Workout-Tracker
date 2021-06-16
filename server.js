const express = require('express');
const { connect } = require('mongoose');
const logger = require('morgan');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/lets-workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});


const apiRouter = require("./routes/apiRoutes.js");
const htmlRouter = require("./routes/htmlRoutes.js");

app.use(apiRouter);
app.use(htmlRouter);

app.listen(PORT, () =>{
    console.log(`We ara connect on port ${PORT}!`);
})