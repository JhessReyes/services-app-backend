const getConection = require("../databases/conection");
const sql = require("mssql");

export const insertUserHasService = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { service_id, description, user_id, method_id } = req.body;
      if (
        service_id == null ||
        description == null ||
        user_id == null ||
        method_id == null
      ) {
        return res.status(400).json({
          message: "Bad Request. Please fill all fields",
        });
      }

      const pool = await getConection();
      const result = await pool
        .request()
        .input("service_id", sql.Int, service_id)
        .input("description", sql.Text, description)
        .input("user_id", sql.Int, user_id)
        .input("method_id", sql.Int, method_id)
        .query(
          "exec pc_insert_user_has_service @service_id, @description, @user_id, @method_id"
        );
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

export const updateUserHasService = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { id, service_id, description, user_id, method_id } = req.body;
      if (id == null) {
        return res.status(400).json({
          message: "Bad Request. (id) is required",
        });
      }

      const pool = await getConection();
      const result = await pool
        .request()
        .input("id", id)
        .input("service_id", sql.Int, service_id)
        .input("description", sql.Text, description)
        .input("user_id", sql.Int, user_id)
        .input("method_id", sql.Int, method_id)
        .query(
          "exec pc_update_user_has_service @id, @service_id, @description, @user_id, @method_id"
        );
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
