import { Router } from "express";
import { validateUser, getUsers } from "../controllers/user.controller";

const router = Router()
router.get("/getUsers", getUsers);
router.post("/validateUser", validateUser);


export default router;
