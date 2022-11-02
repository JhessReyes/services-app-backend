const getConection = require("../databases/conection");
const sql = require("mssql");

export const validateSession = async (req) => {
  try {
    const token = req.headers["x-access-token"] || req.cookies.accessToken;
    /* const { cookies } = req; */

    if (!token) {
      return {
        status: false,
      };
    }
    const pool = await getConection();
    const query = await pool
      .request()
      .input("access_token", sql.VarChar, token)
      .query("exec pc_validate_session @access_token");

    return {
      status: query.recordset[0].status,
      user_id: query.recordset[0].user_id,
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
    };
  }
};

export const log = async (user_id, action, table_name, table_id) => {
  try {
    const pool = await getConection();
    const log = await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .input("action", sql.VarChar, action)
      .input("table_name", sql.VarChar, table_name)
      .input("table_id", sql.Int, table_id)
      .query("exec pc_log @user_id, @action, @table_name, @table_id");
  } catch (error) {
    return false;
  }
};
