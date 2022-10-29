import Router from "express";
import { insertPermission, updatePermission } from "../controllers/permission.controller";
const router = Router();

router.post("/insertPermission", insertPermission);
router.put("/updatePermission", updatePermission);

export default router;
