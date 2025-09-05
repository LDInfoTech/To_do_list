import { useState } from "react";
import "./App.css";
import Todo from "./components/Todo.jsx";
import TodoForm from "./components/TodoForm.jsx";
import Search from "./components/search.jsx";
import Filter from "./components/Filter.jsx";

function App() {
  const [todos, setTodos] = useState([
    // Array de tarefas
    {
      id: 1,
      text: "Criar um projeto React",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir na academia",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar JavaScript",
      category: "Estudos",
      isCompleted: false,
    },
  ]); // Estado inicial com algumas tarefas de exemplo

  const [search, setSearch] = useState(""); // Estado para o termo de pesquisa
  const [filter, setFilter] = useState("all"); // Estado para o filtro de categoria
  const addTodo = (text, category) => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random() * 10000), // Gera um ID aleatório
        text,
        category,
        isCompleted: false, // Nova tarefa não está completa por padrão
      },
    ];

    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const newTodos = [...todos];
    const filteredTodos = newTodos.filter((todo) =>
      todo.id !== id ? todo : null
    );
    setTodos(filteredTodos);
  };

  const editTodo = (id, newText, newCategory) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText, category: newCategory } : todo
    );
    setTodos(updatedTodos);
  };

  const completeTodo = (id) => {
    const newTodos = [...todos];
    newTodos.map((todo) =>
      todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo
    );
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} />
      <div className="todo-list">
        {todos
          .filter((todo) =>
            filter === "all"
              ? true
              : filter === "completed"
              ? todo.isCompleted
              : !todo.isCompleted
          ) // Filtra as tarefas com base no filtro selecionado
          .filter(
            (todo) => todo.text.toLowerCase().includes(search.toLowerCase()) // Corrigido aqui
          )
          .map(
            (
              todo // Renderiza cada tarefa usando o componente Todo
            ) => (
              <Todo
                key={todo.id}
                todo={todo}
                removeTodo={removeTodo}
                completeTodo={completeTodo}
                editTodo={editTodo}
              />
            )
          )}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;
