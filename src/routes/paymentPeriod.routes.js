import Router from "express";
import {
  insertPaymentPeriod,
  updatePaymentPeriod,
} from "../controllers/paymentPeriod.controller";
const router = Router();

router.post("/insertPaymentPeriod", insertPaymentPeriod);
router.put("/updatePaymentPeriod", updatePaymentPeriod);

export default router;
