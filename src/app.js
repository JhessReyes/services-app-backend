const express = require("express");
import config from "./config.js";
import userRoutes from "./routes/user.routes.js";
import methodPaymentRoutes from "./routes/methodPayment.routes.js";
import serviceRoutes from "./routes/service.routes.js";
const bodyParser = require("body-parser");

const app = express();

//setings
app.set("port", config.port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(userRoutes, methodPaymentRoutes, serviceRoutes);
export default app;
