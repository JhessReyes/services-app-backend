import { log, validateSession } from "./session.controller";

const getConection = require("../databases/conection");
const sql = require("mssql");

export const insertUserHasRole = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { role_id, user_id } = req.body;
      if (user_id == null || role_id == null) {
        return res.status(400).json({
          message: "Bad Request. Please fill all fields",
        });
      }

      const pool = await getConection();
      const result = await pool
        .request()
        .input("role_id", sql.Int, role_id)
        .input("user_id", sql.Int, user_id)
        .query("exec pc_insert_user_has_role @role_id, @user_id");

      if (result.recordset[0].status) {
        const logAdd = await log(
          validated.user_id,
          "insert",
          "tbUserHasRole",
          null
        );
      }
      res.status(200).json(result.recordset[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server Error",
        error: error.message,
      });
    }
  } else res.status(401).json({ message: "User Unauthorized", status: false });
};
