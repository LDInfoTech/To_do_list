// Controlador para gerenciar tarefas (CRUD)
const pool = require("../config/db");

// Normaliza o formato da tarefa
function normalize(row) {
  return {
    id: row.id,
    text: row.text,
    category: row.category,
    isCompleted: !!row.is_completed,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
// Funções do controlador
module.exports = {
  async list(req, res) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM tasks ORDER BY created_at DESC"
      );
      return res.json(rows.map(normalize));
    } catch (err) {
      console.error("Erro list tasks:", err);
      return res.status(500).json({ message: "Falha ao carregar tarefas" });
    }
  },

  async get(req, res) {
    try {
      const id = Number(req.params.id);
      const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
      if (!rows[0])
        return res.status(404).json({ message: "Tarefa não encontrada" });
      return res.json(normalize(rows[0]));
    } catch (err) {
      console.error("Erro get task:", err);
      return res.status(500).json({ message: "Erro ao buscar tarefa" });
    }
  },

  async create(req, res) {
    try {
      const { text, category } = req.body;
      if (!text || !category) {
        return res
          .status(400)
          .json({ message: "Campos obrigatórios: text e category" });
      }
      const [result] = await pool.query(
        "INSERT INTO tasks (text, category) VALUES (?, ?)",
        [text, category]
      );
      const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [
        result.insertId,
      ]);
      return res.status(201).json(normalize(rows[0]));
    } catch (err) {
      console.error("Erro create task:", err);
      return res.status(500).json({ message: "Erro ao adicionar tarefa" });
    }
  },

  async update(req, res) {
    try {
      const id = Number(req.params.id);
      const { text, category, isCompleted } = req.body;
      const is_completed = isCompleted ? 1 : 0;
      await pool.query(
        "UPDATE tasks SET text = ?, category = ?, is_completed = ? WHERE id = ?",
        [text, category, is_completed, id]
      );
      const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
      return res.json(normalize(rows[0]));
    } catch (err) {
      console.error("Erro update task:", err);
      return res.status(500).json({ message: "Erro ao atualizar tarefa" });
    }
  },

  async toggle(req, res) {
    try {
      const id = Number(req.params.id);
      await pool.query(
        "UPDATE tasks SET is_completed = NOT is_completed WHERE id = ?",
        [id]
      );
      const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
      return res.json(normalize(rows[0]));
    } catch (err) {
      console.error("Erro toggle task:", err);
      return res.status(500).json({ message: "Erro ao alternar status" });
    }
  },

  async remove(req, res) {
    try {
      const id = Number(req.params.id);
      await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
      return res.status(204).send();
    } catch (err) {
      console.error("Erro remove task:", err);
      return res.status(500).json({ message: "Erro ao excluir tarefa" });
    }
  },
};
