import Router from "express";
import { insertService, updateService } from "../controllers/service.controller";
const router = Router();

router.post("/insertService", insertService);
router.put("/updateService", updateService);

export default router;
