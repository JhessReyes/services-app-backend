const getConection = require("../databases/conection");
const sql = require("mssql");

export const insertService = async (req, res) => {
  try {
    const { name, description, user_id } = req.body;
    if (name == null || description == null || user_id == null) {
      return res.status(400).json({
        message: "Bad Request. Please fill all fields",
      });
    }

    const pool = await getConection();
    const result = await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("description", sql.Text, description)
      .input("user_id", sql.Int, user_id)
      .query("exec pc_insert_service @name, @description, @user_id");
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id, name, description } = req.body;
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
      .input("description", sql.VarChar, description)
      .query("exec pc_update_service @id, @name, @description");
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
