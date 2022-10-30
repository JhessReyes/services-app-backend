import Router from "express";
import {
  insertUserHasService,
  updateUserHasService,
} from "../controllers/userHasService.controller";

const router = Router();

router.post("/insertUserHasService", insertUserHasService);
router.put("/updateUserHasService", updateUserHasService);

export default router;
