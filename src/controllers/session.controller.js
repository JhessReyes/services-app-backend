const getConection = require("../databases/conection");
const sql = require("mssql");

export const validateSession = async (req, res) => {
  try {
    const { cookies } = req;

    if (!cookies.accessToken) {
      res.sendStatus(401);/* 
      return {
        status: query.recordset[0].status,
      };
 */    }

    const pool = await getConection();
    const query = await pool
      .request()
      .input("access_token", sql.VarChar, cookies.accessToken)
      .query("exec pc_validate_session @access_token");

    return {
      status: query.recordset[0].status,
      user_id: query.recordset[0].user_id,
    };
  } catch (error) {
    console.error(error);
    return {
      status: query.recordset[0].status,
    };
  }
};
