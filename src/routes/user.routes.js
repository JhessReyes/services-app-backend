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
router.get("/getUsers", getUsers);
router.get("/getUser/:id", getUserById);
router.put("/updateUser", updateUser);
router.post("/insertUser", insertUser);
router.post("/validateUser", validateUser);

/* ROUTES FOR STATUS */
router.put("/updateStatus", statusChange);

export default router;
