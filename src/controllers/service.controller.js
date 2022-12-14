import { log, validateSession } from "./session.controller";
const getConection = require("../databases/conection");
const sql = require("mssql");

export const insertService = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { name, description } = req.body;
      if (name == null || description == null) {
        return res.status(400).json({
          message: "Bad Request. Please fill all fields",
        });
      }

      const pool = await getConection();
      const result = await pool
        .request()
        .input("name", sql.VarChar, name)
        .input("description", sql.Text, description)
        .input("user_id", sql.Int, validated.user_id)
        .query("exec pc_insert_service @name, @description, @user_id");

      if (result.recordset[0].status) {
        const log = await pool
          .request()
          .input("user_id", sql.Int, validated.user_id)
          .input("action", sql.VarChar, "insert")
          .input("table_name", sql.VarChar, "tbService")
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

export const updateService = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { id, name, description } = req.body;
      if (id == null) {
        return res.status(400).json({
          message: "Bad Request. (id) is required",
        });
      }

      const pool = await getConection();
      const result = await pool
        .request()
        .input("id", id)
        .input("name", sql.VarChar, name)
        .input("description", sql.VarChar, description)
        .query("exec pc_update_service @id, @name, @description");

      if (result.recordset[0].status) {
        const log = await pool
          .request()
          .input("user_id", sql.Int, validated.user_id)
          .input("action", sql.VarChar, "update")
          .input("table_name", sql.VarChar, "tbService")
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

export const newService = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { name, description, price } = req.body;
      if (name == null || description == null || price == null) {
        return res.status(400).json({
          message: "Bad Request. Please fill all fields",
        });
      }

      const pool = await getConection();
      const result = await pool
        .request()
        .input("name", sql.VarChar, name)
        .input("description", sql.Text, description)
        .input("user_id", sql.Int, validated.user_id)
        .input("price", sql.Decimal(10, 2), price)
        .query("exec pc_new_service @name, @description, @user_id, @price");

      if (result.recordset[0].status) {
        const logAdd = await log(
          validated.user_id,
          "insert",
          "tbService",
          null
        );

        const logAdd2 = await log(
          validated.user_id,
          "insert",
          "tbServicePrice",
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
