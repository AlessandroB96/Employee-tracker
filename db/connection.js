const mysql = require('mysql2');

//connect to DB
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Altin1526!/',
        database: 'company_db',
        port: 3306
    }
);

module.exports = db;