const express = require("express");
const ctrl = require("../controllers/task.controller");
const router = express.Router();

router.get("/tasks", ctrl.list);
router.get("/tasks/:id", ctrl.get);
router.post("/tasks", ctrl.create);
router.put("/tasks/:id", ctrl.update);
router.patch("/tasks/:id/toggle", ctrl.toggle);
router.delete("/tasks/:id", ctrl.remove);

module.exports = router;
