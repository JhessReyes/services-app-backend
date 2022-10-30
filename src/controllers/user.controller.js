const getConection = require("../databases/conection");
const sql = require("mssql");
import { nanoid } from "nanoid";

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
      const pool = await getConection();
      const action = "Login";
      const query = await pool
        .request()
        .input("access_token", sql.VarChar, accessToken)
        .input("user_id", sql.Int, result.recordset[0].user_id)
        .query(
          "INSERT INTO tbAccessLog(user_id, access_token) VALUES (@user_id, @access_token)"
        );

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
      });

      res.cookie("userId", result.recordset[0].user_id, {
        httpOnly: true,
      });
    }
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
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
};

export const updateUser = async (req, res) => {
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
};

export const insertUser = async (req, res) => {
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
};

export const getUsers = async (req, res) => {
  try {
    const { cookies } = req;

    if (!cookies.accessToken) return res.status(401);
    const pool = await getConection();
    const query = await pool
      .request()
      .input("access_token", sql.VarChar, cookies.accessToken)
      .query(
        "SELECT user_id FROM tbAccessLog WHERE access_token LIKE @access_token"
      );

    /**validar si no trae user_id */
    const result = await pool.request().query("SELECT * FROM tbUser");
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
