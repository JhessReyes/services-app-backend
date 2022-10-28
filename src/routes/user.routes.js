import { Router } from "express";
import {
  validateUser,
  getUsers,
  getUserById,
  insertUser,
  updateUser,
} from "../controllers/user.controller";

const router = Router();
router.get("/getUsers", getUsers);
router.get("/getUser/:id", getUserById);
router.put("/updateUser", updateUser)
router.post("/insertUser", insertUser);
router.post("/validateUser", validateUser);

export default router;
