const getConection = require("../databases/conection");
const sql = require("mssql");

export const statusChange = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { id, condition, table_name } = req.body;
      if (id == null || condition == null || table_name == null) {
        return res.status(400).json({
          message: "Bad Request. Please fill all fields",
        });
      }

      const pool = await getConection();
      const result = await pool
        .request()
        .input("id", id)
        .input("condition", sql.Bit, condition)
        .input("table_name", sql.VarChar, table_name)
        .query("exec pc_status_change @id, @condition, @table_name");

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
