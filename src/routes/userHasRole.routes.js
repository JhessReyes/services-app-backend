import Router from "express";
import { insertUserHasRole } from "../controllers/userHasRole.controller";
const router = Router();

router.post("/insertUserHasRole", insertUserHasRole);

export default router;
