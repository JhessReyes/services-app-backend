import Router from "express";
import { getEntityById, getObjects } from "../controllers/helper.controller";

const router = Router();

router.get("/getEntityById/:tableName/:id", getEntityById);
router.get("/getObjects/:tableName", getObjects);

export default router;
