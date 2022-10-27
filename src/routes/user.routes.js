import { Router } from "express";
/* const getUser = require("../controllers/user.controller"); */
import { validateUser, getUsers } from "../controllers/user.controller";

const router = Router()
router.get("/getUsers", getUsers);
router.post("/validateUser", validateUser);


export default router;
