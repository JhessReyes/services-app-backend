import { validateSession } from "./session.controller";

const getConection = require("../databases/conection");
const sql = require("mssql");

export const getEntityById = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { id, tableName } = req.params;
      const pool = await getConection();
      const result = await pool
        .request()
        .input("id", id)
        .query("SELECT * FROM " + tableName + " WHERE id = @id");
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
