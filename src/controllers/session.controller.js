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
