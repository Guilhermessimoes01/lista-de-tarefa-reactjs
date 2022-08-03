import React, { useState } from "react";
import "./styles.css";

import Navbar from "./componentes/navbar/navbar";
import TaskList from "./componentes/tasklist/tasklist";

let idAcc = 0;
const generateId = () => {
  idAcc = idAcc + 1;
  return idAcc;
};

export default function App() {
  const [tasks, setTask] = useState([]);

  const addTask = (title, state) => {
    console.log("função sendo chamada em App");
    const newTask = {
      id: generateId(),
      title,
      state
    };
    setTask((existingTasks) => {
      return [...existingTasks, newTask];
    });
  };

  const UpdateTask = (id, title, state) => {
    setTask((existingTasks) => {
      return existingTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, state };
        } else {
          return task;
        }
      });
    });
  };

  const deleteTask = (id) => {
    setTask((existingTasks) => {
      return existingTasks.filter((task) => tasks.id !== id);
    });
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <TaskList
          title="pendente"
          onAddTask={addTask}
          taskState="pendente"
          tasks={tasks.filter((t) => t.state === "pendente")}
          onTaskUpdate={UpdateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title="fazendo"
          onAddTask={addTask}
          taskState="fazendo"
          tasks={tasks.filter((t) => t.state === "fazendo")}
          onTaskUpdate={UpdateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title="completa"
          onAddTask={addTask}
          taskState="completa"
          tasks={tasks.filter((t) => t.state === "completa")}
          onTaskUpdate={UpdateTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
