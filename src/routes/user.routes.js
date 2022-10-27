const Router = require("express"); 
const getUser = require("../controllers/user.controller");/* 
import { validateUser, getUser } from "../controllers/user.controller"; */

const router = Router();/* 

router.get("/validateUser", validateUser); */
router.get("/getUser", getUser);

module.exports = router;
