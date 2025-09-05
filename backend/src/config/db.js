// Configuração da conexão com o banco de dados MySQL
const mysql = require("mysql2/promise");
require("dotenv").config();
// Usa variáveis de ambiente para configuração
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "todolist_user",
  password: process.env.DB_PASSWORD || "Asde4567",
  database: process.env.DB_NAME || "todolist",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
