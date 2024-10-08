// src/components/ToDoList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../component/Todos.module.css'

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Busca as tarefas da API JSONPlaceholder
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar as tarefas:', error);
      });
  }, []);

  // Adiciona uma nova tarefa
  const addTodo = () => {
    if(newTodo.trim()=== '') return;
    const newTask = {
      userId: 1,
      title: newTodo,
      completed: false,
    };

    setTodos([...todos, newTask]);
    setNewTodo('');
    
    axios.post('https://jsonplaceholder.typicode.com/todos', newTask)
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodo('');
      })
      .catch(error => {
        console.error('Erro ao adicionar a tarefa:', error);
      });
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button onClick={addTodo}>Adicionar</button>
      <ul className={styles.todolist}>
        {todos.map(todo => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} readOnly />
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
