import Router from "express";
import { getEntityById } from "../controllers/helper.controller";

const router = Router();

router.get("/getEntityById/:tableName/:id", getEntityById);

export default router;
