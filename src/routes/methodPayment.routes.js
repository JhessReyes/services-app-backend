import Router from "express";
import { insertMethodPayment, updateMethodPayment } from "../controllers/methodPayment.controller";

const router = Router();

router.post("/insertMethodPayment", insertMethodPayment);
router.put("/updateMethodPayment", updateMethodPayment);

export default router;
