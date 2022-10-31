const getConection = require("../databases/conection");
const sql = require("mssql");

export const insertRoleHasPermission = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { role_id, permission_id } = req.body;
      if (role_id == null || permission_id == null) {
        return res.status(400).json({
          message: "Bad Request. Please fill all fields",
        });
      }

      const pool = await getConection();
      const result = await pool
        .request()
        .input("role_id", sql.Int, role_id)
        .input("permission_id", sql.Int, permission_id)
        .query("exec pc_insert_role_has_permission @role_id, @permission_id");
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
