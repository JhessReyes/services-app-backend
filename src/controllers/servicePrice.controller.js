const getConection = require("../databases/conection");
const sql = require("mssql");

export const insertServicePrice = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { service_id, price } = req.body;
      if (service_id == null || price == null) {
        return res.status(400).json({
          message: "Bad Request. Please fill all fields",
        });
      }

      const pool = await getConection();
      const result = await pool
        .request()
        .input("service_id", sql.Int, service_id)
        .input("price", sql.Decimal(10, 2), price)
        .query("exec pc_insert_service_price @service_id, @price");
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

export const updateServicePrice = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { id, service_id, price } = req.body;
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
        .input("price", sql.Decimal(10, 2), price)
        .query("exec pc_update_service_price @id, @service_id, @price");
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
