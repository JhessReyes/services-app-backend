const sql = require("mssql");
import config from "../config";

const dbSettings = {
  user: config.dbUser,
  password: config.dbPassword,
  server: config.dbServer,
  database: config.dbDataBase,
  options: {
    encrypt: true,
    trustServerCertificate: true, //true si el desarrollo es local
  },
};

module.exports = async function getConection() {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
};
