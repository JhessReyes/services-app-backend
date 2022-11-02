import Router from "express";
import {
  insertService,
  newService,
  updateService,
} from "../controllers/service.controller";
const router = Router();

router.post("/insertService", insertService);
router.put("/updateService", updateService);
router.post("/newService", newService);

export default router;
