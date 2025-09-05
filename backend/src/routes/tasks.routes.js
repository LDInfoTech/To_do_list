const express = require("express");
const ctrl = require("../controllers/task.controller");
const router = express.Router();

// Rotas relativas ao prefixo /tasks
router.get("/", ctrl.list); // GET /tasks
router.get("/:id", ctrl.get); // GET /tasks/:id
router.post("/", ctrl.create); // POST /tasks
router.put("/:id", ctrl.update); // PUT /tasks/:id
router.patch("/:id/toggle", ctrl.toggle); // PATCH /tasks/:id/toggle
router.delete("/:id", ctrl.remove); // DELETE /tasks/:id

module.exports = router;
