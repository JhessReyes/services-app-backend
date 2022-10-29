const express = require("express");
import config from "./config.js";
import userRoutes from "./routes/user.routes.js";
import methodPayment from "./routes/methodPayment.routes.js";
const bodyParser = require("body-parser");

const app = express();

//setings
app.set("port", config.port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(userRoutes, methodPayment);
export default app;
