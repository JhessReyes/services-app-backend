import { Router } from "express";
import {
  validateUser,
  getUsers,
  getUserById,
  insertUser,
  updateUser,
} from "../controllers/user.controller";

import { statusChange } from "../controllers/status.controller";

const router = Router();
/* ROUTES FOR USERS */
const cors = require("cors");
app.use(
  cors({
    origin: "https://services-app-frontend.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
router.get("/getUsers", cors(), getUsers);
router.get("/getUser/:id", getUserById);
router.put("/updateUser", updateUser);
router.post("/insertUser", insertUser);
router.post("/validateUser", validateUser);

/* ROUTES FOR STATUS */
router.put("/updateStatus", statusChange);

export default router;
