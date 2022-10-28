import Router from "express";
import { inserMethodPayment } from "../controllers/methodPayment.controller";


const router = Router();

router.post("/insertMethodPayment", inserMethodPayment);

export default router;