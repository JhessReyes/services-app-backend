const getConection = require("../databases/conection");
const sql = require("mssql");
import { nanoid } from "nanoid";

export const validateCookie = async (req, res) => {
  try {
    const { cookies } = req;
    console.log(cookies.accessToken);
    if (!cookies.accessToken) return res.status(401);
    const pool = await getConection();
    const query = await pool
      .request()
      .input("access_token", sql.VarChar, cookies.accessToken)
      .query(
        "SELECT user_id FROM tbAccessLog WHERE access_token LIKE @access_token"
      );

    /**validar si no trae user_id */
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "User Unauthorized",
      error: error.message,
    });
  }
};
