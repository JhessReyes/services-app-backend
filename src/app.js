const express = require("express");
import config from "./config.js";
import userRoutes from "./routes/user.routes.js";
import methodPaymentRoutes from "./routes/methodPayment.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import servicePriceRoute from "./routes/servicePrice.routes.js";
import roleRoutes from "./routes/role.routes.js";
import permissionRoutes from "./routes/permission.routes.js";
import roleHasPermissionRoutes from "./routes/roleHasPermission.routes.js";
import paymentPeriodRoutes from "./routes/paymentPeriod.routes.js";
import userHasServiceRoutes from "./routes/userHasService.routes.js";
import userHasRoleRoutes from "./routes/userHasRole.routes.js";
import paymentRecordRoutes from "./routes/paymentRecord.routes.js";
import helperRoutes from "./routes/helper.routes.js";
import cookieParser from "cookie-parser";
const cors = require("cors");
const bodyParser = require("body-parser");

const cookiesMiddleware = require("universal-cookie-express");
const app = express();

//setings
app.set("port", config.port);
app.use(
  cors({
    origin: "https://services-app-frontend.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.set("trust proxy", 1);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(cookiesMiddleware());
app.use(
  userRoutes,
  methodPaymentRoutes,
  serviceRoutes,
  servicePriceRoute,
  roleRoutes,
  permissionRoutes,
  roleHasPermissionRoutes,
  paymentPeriodRoutes,
  userHasServiceRoutes,
  userHasRoleRoutes,
  paymentRecordRoutes,
  helperRoutes
);
export default app;
