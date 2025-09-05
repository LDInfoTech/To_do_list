const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET - Todas as tarefas
router.get("/", async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM tasks ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

// POST - Nova tarefa
router.post("/", async (req, res, next) => {
  try {
    const { text, category } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Texto é obrigatório" });
    }

    const [result] = await db.execute(
      "INSERT INTO tasks (text, category, is_completed) VALUES (?, ?, false)",
      [text, category || "Geral"]
    );

    res.json({
      id: result.insertId,
      text,
      category: category || "Geral",
      is_completed: false,
    });
  } catch (error) {
    next(error);
  }
});

// PUT - Atualizar tarefa (completar/descompletar)
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { is_completed } = req.body;

    await db.execute("UPDATE tasks SET is_completed = ? WHERE id = ?", [
      is_completed,
      id,
    ]);

    res.json({ message: "Tarefa atualizada com sucesso" });
  } catch (error) {
    next(error);
  }
});

// DELETE - Remover tarefa
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM tasks WHERE id = ?", [id]);
    res.json({ message: "Tarefa deletada com sucesso" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
