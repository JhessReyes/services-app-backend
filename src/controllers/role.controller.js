import { log, validateSession } from "./session.controller";

const getConection = require("../databases/conection");
const sql = require("mssql");

export const insertRole = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { name } = req.body;
      if (name == null) {
        return res.status(400).json({
          message: "Bad Request. Please fill all fields",
        });
      }

      const pool = await getConection();
      const result = await pool
        .request()
        .input("name", sql.VarChar, name)
        .query("exec pc_insert_role @name");
      if (result.recordset[0].status) {
        const logAdd = await log(validated.user_id, "insert", "tbRole", null);
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
