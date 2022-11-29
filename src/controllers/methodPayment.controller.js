import { validateSession } from "./session.controller";

const getConection = require("../databases/conection");
const sql = require("mssql");

export const insertMethodPayment = async (req, res) => {
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
        .input("user_id", sql.Int, validated.user_id)
        .query("exec pc_insert_method_payment @name, @user_id");

      if (result.recordset[0].status) {
        const log = await pool
          .request()
          .input("user_id", sql.Int, validated.user_id)
          .input("action", sql.VarChar, "insert")
          .input("table_name", sql.VarChar, "tbMethodPayment")
          .input("table_id", null)
          .query("exec pc_log @user_id, @action, @table_name, @table_id");
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

export const updateMethodPayment = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { id, name } = req.body;
      if (id == null || name == null) {
        return res.status(400).json({
          message: "Bad Request. Please fill all fields",
        });
      }

      const pool = await getConection();
      const result = await pool
        .request()
        .input("id", id)
        .input("name", sql.VarChar, name)
        .query("exec pc_update_method_payment @id, @name");

      if (result.recordset[0].status) {
        const log = await pool
          .request()
          .input("user_id", sql.Int, validated.user_id)
          .input("action", sql.VarChar, "update")
          .input("table_name", sql.VarChar, "tbMethodPayment")
          .input("table_id", sql.Int, id)
          .query("exec pc_log @user_id, @action, @table_name, @table_id");
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
