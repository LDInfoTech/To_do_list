//Garantir integridade dos dados enviados.
const repo = require("../repositories/taskRepository"); // Importa o repositório de tarefas
const Joi = require("joi"); // Biblioteca para validação de dados

// Esquema de validação para criação de tarefas
const schemaCreate = Joi.object({
  text: Joi.string().min(1).max(255).required(),
  category: Joi.string().min(1).max(100).required(),
  is_completed: Joi.boolean().optional(),
});
// Esquema de validação para atualização de tarefas (similar ao de criação)
module.exports = {
  async list(req, res, next) {
    try {
      const tasks = await repo.listAll();
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  },
  async get(req, res, next) {
    try {
      const task = await repo.getById(Number(req.params.id));
      if (!task)
        return res.status(404).json({ message: "Tarefa não encontrada" });
      res.json(task);
    } catch (err) {
      next(err);
    }
  },
  async create(req, res, next) {
    try {
      const { error, value } = schemaCreate.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });
      const created = await repo.create(value);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  },
  async update(req, res, next) {
    /* similar: validar + repo.update */
  },
  async toggle(req, res, next) {
    /* repo.toggleComplete + 404 check */
  },
  async remove(req, res, next) {
    /* 404 check + repo.remove + 204 */
  },
};
