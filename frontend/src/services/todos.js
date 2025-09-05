import { api } from "./Api";
// Funções para interagir com a API de tarefas
export const listTasks = () => api.get("/tasks").then((r) => r.data);
export const createTask = (payload) =>
  api.post("/tasks", payload).then((r) => r.data);
export const updateTask = (id, payload) =>
  api.put(`/tasks/${id}`, payload).then((r) => r.data);
export const toggleTask = (id) =>
  api.patch(`/tasks/${id}/toggle`).then((r) => r.data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
