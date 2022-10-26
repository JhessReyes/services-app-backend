const sql = require("mssql");

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
    user: 'admin',
    password: '1234',
    server: 'localhost',
    database: 'RegisterServices',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
}

module.exports =  async function getConection() {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;        
    } catch (error) {
        console.error(error)
    }
}