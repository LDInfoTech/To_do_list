require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const taskRoutes = require("./routes/tasks.routes");
const errorHandler = require("./middlewares/errorHandler");
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
