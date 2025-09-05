// Repositório para operações de banco de dados relacionadas a tarefas
const pool = require("../config/db");
// Importa a conexão com o banco de dados
module.exports = {
  // Lista todas as tarefas
  async listAll() {
    const [rows] = await pool.query(
      "SELECT * FROM tasks ORDER BY created_at DESC"
    );
    return rows;
  },
  // Obtém uma tarefa pelo ID
  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
    return rows[0] || null;
  },
  // Cria uma nova tarefa
  async create({ text, category, is_completed = 0 }) {
    const [result] = await pool.query(
      "INSERT INTO tasks (text, category, is_completed) VALUES (?, ?, ?)",
      [text, category, is_completed ? 1 : 0]
    );
    return this.getById(result.insertId);
  },
  // Atualiza uma tarefa existente
  async update(id, { text, category, is_completed }) {
    await pool.query(
      "UPDATE tasks SET text = ?, category = ?, is_completed = ? WHERE id = ?",
      [text, category, is_completed ? 1 : 0, id]
    );
    return this.getById(id);
  },
  // Alterna o status de conclusão de uma tarefa
  async toggleComplete(id) {
    await pool.query(
      "UPDATE tasks SET is_completed = NOT is_completed WHERE id = ?",
      [id]
    );
    return this.getById(id);
  },
  // Remove uma tarefa
  async remove(id) {
    await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
  },
};
