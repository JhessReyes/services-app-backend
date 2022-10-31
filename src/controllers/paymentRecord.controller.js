const getConection = require("../databases/conection");
const sql = require("mssql");

export const insertPaymentRecord = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { price, user_service_id, create_user_id } = req.body;
      if (price == null || user_service_id == null || create_user_id == null) {
        return res.status(400).json({
          message: "Bad Request. Please fill all fields",
        });
      }

      const pool = await getConection();
      const result = await pool
        .request()
        .input("price", sql.Decimal(10, 2), price)
        .input("user_service_id", sql.Int, user_service_id)
        .input("create_user_id", sql.Int, create_user_id)
        .query(
          "exec pc_insert_payment_record @price, @user_service_id, @create_user_id"
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

export const updatePaymentRecord = async (req, res) => {
  const validated = await validateSession(req);
  if (validated.status) {
    try {
      const { id, price } = req.body;
      if (id == null || price == null) {
        return res.status(400).json({
          message: "Bad Request. all fields is requiered",
        });
      }

      const pool = await getConection();
      const result = await pool
        .request()
        .input("id", id)
        .input("price", sql.Decimal(10, 2), price)
        .query("exec pc_update_payment_record @id, @price");
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
