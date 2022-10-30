import Router from "express";
import { insertPaymentPeriod } from "../controllers/paymentPeriod.controller";
const router = Router();

router.post("/insertPaymentPeriod", insertPaymentPeriod);

export default router;
