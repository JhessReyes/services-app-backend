const Router = require("express");
const getUsers = require("../controllers/user.controller");

const router = Router();

router.get("/getUser", getUsers);

module.exports =  router;
