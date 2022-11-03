import { query } from "express";
import { validateSession } from "./session.controller";

const getConection = require("../databases/conection");
const sql = require("mssql");

export const getEntityById = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { id, tableName } = req.params;
      const pool = await getConection();
      const result = await pool
        .request()
        .input("id", id)
        .query("SELECT * FROM " + tableName + " WHERE id = @id");
      if (result.recordset[0] == undefined) {
        res.status(404).json({ message: "Object Not Found", status: false });
      } else {
        res.status(200).json(result.recordset[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server Error",
        error: error.message,
      });
    }
  } else res.status(401).json({ message: "User Unauthorized", status: false });
};

export const getObjects = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { tableName } = req.params;
      let select = "SELECT * FROM " + tableName;
      if (tableName == "getServiceWithPrices") {
        select = "SELECT * FROM getServiceWithPrices";
      } else if (tableName == "getUserHasService") {
        select = "SELECT * FROM getUserHasService";
      } else if (tableName == "reportAmountUserService") {
        select = "SELECT * FROM reportAmountUserService";
      } else if (tableName == "reportPaymentRecord") {
        select = "SELECT * FROM reportPaymentRecord";
      } else if (tableName == "reportAmountServiceUser") {
        select = "SELECT * FROM reportAmountServiceUser";
      } else if (tableName == "reportAmountMethodService") {
        select = "SELECT * FROM reportAmountMethodService";
      } else if (tableName == "reportAmountPaymentService") {
        select = "SELECT * FROM reportAmountPaymentService";
      } else if (tableName == "reportAmountUserServiceStatus") {
        select = "SELECT * FROM reportAmountUserServiceStatus";
      }

      const pool = await getConection();
      const result = await pool.request().query(select);
      res.status(200).json(result.recordset);
      /*       if (result.recordset[0] == undefined) {
        res.status(404).json({ message: "Object Not Found", status: false });
      } else {
        res.status(200).json(result.recordset);
      } */
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server Error",
        error: error.message,
      });
    }
  } else res.status(401).json({ message: "User Unauthorized", status: false });
};

export const getCountStatus = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { tableName } = req.params;
      let select =
        "SELECT (SELECT COUNT(*) FROM " +
        tableName +
        " WHERE status LIKE 1 ) AS true, (SELECT COUNT(*) FROM " +
        tableName +
        " WHERE status LIKE 0 ) AS false";
      const pool = await getConection();
      const result = await pool.request().query(select);
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

export const getRole = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { userId } = req.params;
      console.log(userId);
      let select =
        "SELECT rol.name FROM tbRole rol, tbUser usr, tbUserHasRole usrol WHERE rol.id = usrol.role_id" +
        " AND usr.id = usrol.user_id" +
        " AND usr.id LIKE " +
        userId;
      const pool = await getConection();
      const result = await pool.request().query(select);
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
