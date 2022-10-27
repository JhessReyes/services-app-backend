import { Router } from "express";
import {
  validateUser,
  getUsers,
  getUserById,
  insertUser,
} from "../controllers/user.controller";

const router = Router();
router.get("/getUsers", getUsers);
router.get("/getUser/:id", getUserById);
/* router.put("/updateUser", ) */
router.post("/insertUser", insertUser);
router.post("/validateUser", validateUser);

export default router;
