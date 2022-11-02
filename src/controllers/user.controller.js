const getConection = require("../databases/conection");
const sql = require("mssql");
import { nanoid } from "nanoid";
import { validateSession } from "./session.controller";

export const validateUser = async (req, res) => {
  try {
    const { mail, password } = req.body;
    if (mail == null || password == null) {
      return res.status(400).json({
        message: "Bad Request. Please fill all fields",
      });
    }

    const pool = await getConection();
    const result = await pool
      .request()
      .input("mail", sql.VarChar, mail)
      .input("password", sql.VarChar, password)
      .query("exec pc_validate_user @mail, @password");

    if (result.recordset[0].status) {
      const accessToken = nanoid();
      const resultAux = await pool
        .request()
        .input("access_token", sql.VarChar, accessToken)
        .input("user_id", sql.Int, result.recordset[0].user_id)
        .query("exec pc_create_session @access_token, @user_id");

      if (resultAux.recordset[0].status) {
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
        });

        res.cookie("userId", resultAux.recordset[0].user_id, {
          httpOnly: true,
        });
        res.status(200).json(resultAux.recordset[0]);
      } else {
        res.status(500).json({
          message: "something happened while creating session",
        });
      }
    } else
      res.status(401).json({ message: "User Unauthorized", status: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { id } = req.params;
      const pool = await getConection();
      const result = await pool
        .request()
        .input("id", id)
        .query("SELECT * FROM tbUser WHERE id = @id");
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

export const updateUser = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { id, name, mail, password } = req.body;
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
        .input("mail", sql.VarChar, mail)
        .input("password", sql.VarChar, password)
        .query("exec pc_update_user @id, @name, @mail, @password");
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

export const insertUser = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { name, mail, password } = req.body;
      if (name == null || mail == null || password == null) {
        return res.status(400).json({
          message: "Bad Request. Please fill all fields",
        });
      }

      const pool = await getConection();
      const result = await pool
        .request()
        .input("name", sql.VarChar, name)
        .input("mail", sql.VarChar, mail)
        .input("password", sql.VarChar, password)
        .query("exec pc_insert_user @name, @mail, @password");
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

export const getUsers = async (req, res) => {
  console.log(req.cookies.accessToken);
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const pool = await getConection();
      const result = await pool.request().query("SELECT * FROM tbUser");
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server Error",
        error: error.message,
      });
    }
  } else res.status(401).json({ message: "User Unauthorized", status: false });
};
