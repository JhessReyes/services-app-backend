import { log, validateSession } from "./session.controller";

const getConection = require("../databases/conection");
const sql = require("mssql");

export const insertPermission = async (req, res) => {
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
        .query("exec pc_insert_permission @name");
      if (result.recordset[0].status) {
        const logAdd = await log(
          validated.user_id,
          "insert",
          "tbPermission",
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

export const updatePermission = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { id, name } = req.body;
      if (id == null || name == null) {
        return res.status(400).json({
          message: "Bad Request. all fields is required",
        });
      }

      const pool = await getConection();
      const result = await pool
        .request()
        .input("id", id)
        .input("name", sql.VarChar, name)
        .query("exec pc_update_permission @id, @name");

      if (result.recordset[0].status) {
        const logAdd = await log(
          validated.user_id,
          "update",
          "tbPermission",
          id
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
