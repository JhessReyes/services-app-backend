const Router = require("express");
const users = require("../controllers/user.controller");

const router = Router();

router.get("/getUser", users.getUsers);

module.exports =  router;
