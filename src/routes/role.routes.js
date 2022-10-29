import Router from "express";
import { insertRole } from "../controllers/role.controller";
const router = Router();

router.post("/insertRole", insertRole);

export default router;
