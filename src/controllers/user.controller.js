/* import { getConection } from "../databases/conection"; */
const conection = require("../databases/conection");
 /* const sql = require("mssql"); */

/* export const validateUser = async (req, res) => {
    try {
    const { mail, password } = req.body;
    if( mail == null || password == null){
        return res.status(400).json({
            message: "Bad Request. Please fill all fields"
        })
    }
    console.log(req.body)
    const pool = await getConection();
    const result = await pool
      .request()
      .input("mail", sql.VarChar, mail)
      .input("password", sql.VarChar, password)
      .query("exec pc_validate_user @mail, @password");

    console.log(result);
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
}; */

const getUsers = async (req, res) => {
  try {
    const pool = await conection.getConection();
    res.status(200).json(pool);
    const result = await pool.request().query("SELECT 1");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export { getUsers };

/* module.exports = async function createUser(req, res) {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
 */
