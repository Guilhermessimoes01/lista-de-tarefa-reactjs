import React, { useState } from "react";
import PropTypes from "prop-types";
import "./TaskItem.css";

export default function TaskItem({
  id,
  title,
  taskState,
  onTaskUpdate,
  onDeleteTask
}) {
  const [isEditing, setisEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);

  const onTitleChange = (event) => {
    const newTitle = event.target.value;
    setEditableTitle(newTitle);
    onTaskUpdate(id, newTitle, taskState);
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      setisEditing(false);
      if (editableTitle.length === 0) {
        onDeleteTask(id);
      }
    }
  };

  const onTaskStatechange = (event) => {
    onTaskUpdate(id, title, event.target.value);
  };

  if (isEditing) {
    return (
      <input
        type="text"
        value={editableTitle}
        onChange={onTitleChange}
        onKeyPress={onKeyPress}
      />
    );
  } else {
    return (
      <div className="taskItem">
        <div onClick={(e) => setisEditing(true)}>{editableTitle}</div>
        <select onChange={onTaskStatechange} value={taskState}>
          <option value="pendente">pendente</option>
          <option value="fazendo">fazendo</option>
          <option value="completa">completa</option>
        </select>
      </div>
    );
  }
}

TaskItem.proptypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  taskState: PropTypes.string.isRequired
};
