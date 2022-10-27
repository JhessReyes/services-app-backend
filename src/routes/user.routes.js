import { Router } from "express";
import { validateUser, getUsers, getUserById } from "../controllers/user.controller";

const router = Router()
router.get("/getUsers", getUsers);
router.get("/getUser/:id", getUserById);
router.post("/validateUser", validateUser);


export default router;
