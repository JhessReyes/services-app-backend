const express = require("express");
const config = require("./config.js");
const userRoutes = require("./routes/user.routes.js");

const app = express();

//setings
app.set("port", 3000 /* config.port */);
app.use(userRoutes);
module.exports = app;
