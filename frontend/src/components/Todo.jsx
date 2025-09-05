import React, { useState } from "react";

const Todo = ({ todo, removeTodo, completeTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editCategory, setEditCategory] = useState(todo.category);

  const handleSave = () => {
    if (editText.trim() === "") return;
    editTodo(todo.id, editText, editCategory);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditCategory(todo.category);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="todo edit-mode">
        <div className="content">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
          />
          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            className="edit-select"
          >
            <option value="Trabalho">Trabalho</option>
            <option value="Pessoal">Pessoal</option>
            <option value="Estudos">Estudos</option>
          </select>
        </div>
        <div>
          <button className="complete" onClick={handleSave}>
            Salvar
          </button>
          <button className="remove" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      <div className="content">
        <p>{todo.text}</p>
        <p className="category">({todo.category})</p>
      </div>
      <div>
        <button className="complete" onClick={() => completeTodo(todo.id)}>
          {todo.isCompleted ? "Desfazer" : "Completar"}
        </button>
        <button className="edit" onClick={() => setIsEditing(true)}>
          Editar
        </button>
        <button className="remove" onClick={() => removeTodo(todo.id)}>
          Excluir
        </button>
      </div>
    </div>
  );
};

export default Todo;
