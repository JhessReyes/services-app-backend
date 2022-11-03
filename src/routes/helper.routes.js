import Router from "express";
import {
  getCountStatus,
  getEntityById,
  getObjects,
} from "../controllers/helper.controller";

const router = Router();

router.get("/getEntityById/:tableName/:id", getEntityById);
router.get("/getObjects/:tableName", getObjects);
router.get("/getCountStatus/:tableName", getCountStatus);

export default router;
