const getConection = require("../databases/conection");

module.exports =  getUser = async (req, res) => {
  try {
    const pool = await getConection();    
    const result = await pool.request().query("SELECT * FROM tbUser");
    console.log(result)
    res.json(result.recordset) 
  /*   res.json({
      status: 200,
      message: "Get data successful",
    }); */
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
  /*     const pool = await getConection();    
    const result = await pool.request().query("SELECT 1");
    console.log(result)
    res.json(result.recordset) */
};
