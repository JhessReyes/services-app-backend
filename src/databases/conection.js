import sql from "mssql"

/* const dbSettings = {
    user: 'admin',
    password: '1234',
    server: 'localhost',
    database: 'RegisterServices',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
} */
const dbSettings = {
  user: "servicesapp",
  password: "Srvrecord$*",
  server: "srvservicesapp.database.windows.net",
  database: "BDServiceRecord",
};

const getConection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
}
export { getConection };
