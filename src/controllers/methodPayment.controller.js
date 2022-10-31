const getConection = require("../databases/conection");
const sql = require("mssql");

export const insertMethodPayment = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { name, user_id } = req.body;
      if (name == null || user_id == null) {
        return res.status(400).json({
          message: "Bad Request. Please fill all fields",
        });
      }

      const pool = await getConection();
      const result = await pool
        .request()
        .input("name", sql.VarChar, name)
        .input("user_id", sql.Int, user_id)
        .query("exec pc_insert_method_payment @name, @user_id");
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

export const updateMethodPayment = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { id, name } = req.body;
      if (id == null || name == null) {
        return res.status(400).json({
          message: "Bad Request. Please fill all fields",
        });
      }

      const pool = await getConection();
      const result = await pool
        .request()
        .input("id", id)
        .input("name", sql.VarChar, name)
        .query("exec pc_update_method_payment @id, @name");
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
