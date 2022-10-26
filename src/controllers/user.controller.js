import { getConection } from "../databases/conection";

export const getUser = async (req, res) => {
  try {
    res.json({
        status: 200,
        message: 'Get data successful',
    });
  } catch (error) {
      console.error(error);
      return res.status(500).send('Server Error')
  }
  /*     const pool = await getConection();    
    const result = await pool.request().query("SELECT * FROM tbService");
    console.log(result)
    res.json(result.recordset) */
};
