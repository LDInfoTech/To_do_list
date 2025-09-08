import { useEffect, useState } from "react";
import "./App.css";
import Todo from "./components/Todo.jsx";
import TodoForm from "./components/TodoForm.jsx";
import Search from "./components/search.jsx";
import Filter from "./components/Filter.jsx";
import {
  listTasks,
  createTask,
  updateTask,
  toggleTask,
  deleteTask,
} from "./services/todos";
//
function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await listTasks();
        setTodos(
          data.map((t) => ({
            id: t.id,
            text: t.text,
            category: t.category,
            isCompleted: !!t.is_completed,
          }))
        );
        // eslint-disable-next-line no-unused-vars
      } catch (e) {
        setError("Falha ao carregar tarefas");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addTodo = async (text, category) => {
    try {
      const created = await createTask({ text, category, is_completed: false });
      setTodos((prev) => [
        {
          id: created.id,
          text: created.text,
          category: created.category,
          isCompleted: !!created.is_completed,
        },
        ...prev,
      ]);
    } catch {
      setError("Erro ao adicionar tarefa");
    }
  };

  const removeTodo = async (id) => {
    try {
      await deleteTask(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("Erro ao excluir tarefa");
    }
  };

  const editTodo = async (id, newText, newCategory) => {
    try {
      const cur = todos.find((t) => t.id === id);
      const updated = await updateTask(id, {
        text: newText,
        category: newCategory,
        is_completed: cur.isCompleted,
      });
      setTodos((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                id,
                text: updated.text,
                category: updated.category,
                isCompleted: !!updated.is_completed,
              }
            : t
        )
      );
    } catch {
      setError("Erro ao editar");
    }
  };

  const completeTodo = async (id) => {
    try {
      const updated = await toggleTask(id);
      setTodos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, isCompleted: !!updated.is_completed } : t
        )
      );
    } catch {
      setError("Erro ao atualizar status");
    }
  };

  const filtered = todos
    .filter((t) =>
      filter === "all"
        ? true
        : filter === "completed"
        ? t.isCompleted
        : !t.isCompleted
    )
    .filter((t) => t.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <Search search={search} setSearch={setSearch} />
          <Filter filter={filter} setFilter={setFilter} />
          <div className="todo-list">
            {filtered.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                removeTodo={removeTodo}
                completeTodo={completeTodo}
                editTodo={editTodo}
              />
            ))}
          </div>
          <TodoForm addTodo={addTodo} />
        </>
      )}
    </div>
  );
}

export default App;
