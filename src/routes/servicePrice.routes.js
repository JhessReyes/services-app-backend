import Router from "express";
import {
  insertServicePrice,
  updateServicePrice,
} from "../controllers/servicePrice.controller";
const router = Router();

router.post("/insertServicePrice", insertServicePrice);
router.put("/updateServicePrice", updateServicePrice);

export default router;
