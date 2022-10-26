import { getConection } from "../databases/conection";

export const getUser = async (req, res) => {
    
    const pool = await getConection();    
    const result = await pool.request().query("SELECT * FROM tbService");
    console.log(result)
    res.json(result.recordset)
};