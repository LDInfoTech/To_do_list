require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const taskRoutes = require("./routes/tasks"); //importa as rotas de tarefas
const errorHandler = require("./middlewares/errorHandler"); //importa o middleware de tratamento de erros
const db = require("./config/db"); //importa a configuração do banco de dados para inicializar a conexão antecipadamente
// um middleware de tratamento de erros
const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
// Rotas
app.use("/tasks", taskRoutes);
app.use(errorHandler);
// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
