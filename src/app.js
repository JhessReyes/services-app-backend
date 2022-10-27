const express = require("express");
const config = require("./config.js");
const bodyParser = require('body-parser')
const userRoutes = require("./routes/user.routes.js");

const app = express();

//setings
app.set("port", 3000 /* config.port */);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(userRoutes);
module.exports = app;
