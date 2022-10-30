import Router from "express";
import {
  insertPaymentRecord,
  updatePaymentRecord,
} from "../controllers/paymentRecord.controller";
const router = Router();

router.post("/insertPaymentRecord", insertPaymentRecord);
router.put("/updatePaymentRecord", updatePaymentRecord);

export default router;
