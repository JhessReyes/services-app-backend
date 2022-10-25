import sql from "mssql";

const dbSettings = {
    user: 'admin',
    password: '1234',
    server: 'localhost',
    database: 'RegisterServices',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
}

async function getConection() {
    const pool = await sql.connect(dbSettings);
    const result = await pool.request().query("SELECT * FROM tbService");
    console.log(result)
}

getConection();