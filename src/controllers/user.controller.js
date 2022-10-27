/* const getConection = require("../databases/conection"); */
/* const sql = require("mssql"); */

module.exports = async function validateUser (req, res) {
  try {
/*     const pool = await getConection();
    const result = await pool
      .request()
      .input("mail", sql.VarChar, "jhonatan@gmail.com")
      .input("password", sql.VarChar, "admin")
      .query("exec pc_validate_user @mail, @password");
    console.log(result);
    res.status(200).json(result.recordset);
 */
    res.json({
        status: 200,
        message: "Get data successful validate",
      });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

export const getUser = async(req, res) => {
  try {
/*     const pool = await getConection();
    const result = await pool.request().query("SELECT * FROM tbUser"); */
/*     console.log(result);
    res.status(200).json(result.recordset); */
      res.json({
      status: 200,
      message: "Get data successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Server Error",
      error: error.message
    });
  }
/*       const pool = await getConection();    
    const result = await pool.request().query("SELECT 1");
    console.log(result)
    res.json(result.recordset) */
};

/* module.exports = async function createUser(req, res) {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
 */