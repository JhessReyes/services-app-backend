import { validateSession } from "./session.controller";

const getConection = require("../databases/conection");
const sql = require("mssql");

export const insertPaymentPeriod = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { period, interest, method_id } = req.body;
      if (period == null || interest == null || method_id == null) {
        return res.status(400).json({
          message: "Bad Request. Please fill all fields",
        });
      }

      const pool = await getConection();
      const result = await pool
        .request()
        .input("period", sql.Int, period)
        .input("interest", sql.Decimal(10, 2), interest)
        .input("method_id", sql.Int, method_id)
        .input("user_id", sql.Int, validated.user_id)
        .query(
          "exec pc_insert_payment_period @period, @interest, @method_id, @user_id"
        );

      if (result.recordset[0].status) {
        const log = await pool
          .request()
          .input("user_id", sql.Int, validated.user_id)
          .input("action", sql.VarChar, "insert")
          .input("table_name", sql.VarChar, "tbPaymentPeriod")
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

export const updatePaymentPeriod = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { id, period, interest } = req.body;
      if (id == null) {
        return res.status(400).json({
          message: "Bad Request. (id) is requiered",
        });
      }

      const pool = await getConection();
      const result = await pool
        .request()
        .input("id", id)
        .input("period", sql.Int, period)
        .input("interest", sql.Decimal(10, 2), interest)
        .query("exec pc_update_payment_period @id, @period, @interest");

      if (result.recordset[0].status) {
        const log = await pool
          .request()
          .input("user_id", sql.Int, validated.user_id)
          .input("action", sql.VarChar, "update")
          .input("table_name", sql.VarChar, "tbPaymentPeriod")
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
