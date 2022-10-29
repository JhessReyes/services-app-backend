import Router from "express";
import { insertRoleHasPermission } from "../controllers/roleHasPermission.controller";
const router = Router();

router.post("/insertRoleHasPermission", insertRoleHasPermission);

export default router;
