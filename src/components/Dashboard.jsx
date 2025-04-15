import React, { useState, useEffect } from "react";
import "../components/dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDue, setTaskDue] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("dark");
  const [clock, setClock] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");
  const [editDue, setEditDue] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setClock(
        `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.className = theme === "light" ? "light-theme" : "dark-theme";
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      tasks.forEach((task) => {
        if (task.reminder) {
          const dueTime = new Date(task.due).getTime();
          const reminderTime = dueTime - task.reminder * 60 * 60 * 1000;
          const diff = reminderTime - now;

          if (diff <= 1000 && diff >= 0) {
            alert(`Reminder: Task "${task.name}" is due soon!`);
          }
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [tasks]);

  const handleAddTask = () => {
    if (!taskName || !taskDue) {
      alert("Please enter task details!");
      return;
    }
    const newTask = {
      name: taskName,
      due: taskDue,
      reminder: reminderTime,
    };
    setTasks((prev) => [...prev, newTask]);
    setTaskName("");
    setTaskDue("");
    setReminderTime("");
  };

  const handleDeleteTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCompleteTask = (index) => {
    const task = tasks[index];
    setTasks((prev) => prev.filter((_, i) => i !== index));
    setCompletedTasks((prev) => [...prev, task]);
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(search.toLowerCase().trim())
  );
  const filteredCompleted = completedTasks.filter((task) =>
    task.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  const totalTasks = tasks.length + completedTasks.length;
  const completedCount = completedTasks.length;
  const progress = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <span className="title">Task Manager</span>
        <button className="home-btn" onClick={() => navigate("/main")}>Home</button>
        <span className="clock">{clock}</span>
        <button id="themeToggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="add-task-container">
        <h2>Add Task</h2>
        <input
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="datetime-local"
          value={taskDue}
          onChange={(e) => setTaskDue(e.target.value)}
        />
        <input
          type="number"
          placeholder="Reminder time (in hours)"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="container">
        <div className="box">
          <h1 className="box-heading">Tasks</h1>
          {filteredTasks.length === 0 ? (
            <p>No pending tasks.</p>
          ) : (
            filteredTasks.map((task, index) => (
              editIndex === index ? (
                <div className="task editing" key={index}>
                  <input
                    type="text"
                    value={editTaskName}
                    onChange={(e) => setEditTaskName(e.target.value)}
                  />
                  <input
                    type="datetime-local"
                    value={editDue}
                    onChange={(e) => setEditDue(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      const updated = [...tasks];
                      updated[index] = {
                        ...updated[index],
                        name: editTaskName,
                        due: editDue,
                      };
                      setTasks(updated);
                      setEditIndex(null);
                    }}
                  >
                    Save
                  </button>
                  <button onClick={() => setEditIndex(null)}>Cancel</button>
                </div>
              ) : (
                <div key={index} className="task">
                  <span>
                    {task.name} (Due: {new Date(task.due).toLocaleString()})
                  </span>
                  <div>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditIndex(index);
                        setEditTaskName(task.name);
                        setEditDue(task.due);
                      }}
                    >
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteTask(index)}>
                      Delete
                    </button>
                    <button className="complete-btn" onClick={() => handleCompleteTask(index)}>
                      Complete
                    </button>
                  </div>
                </div>
              )
            ))
          )}
        </div>

        <div className="box">
          <h1 className="box-heading">Completed Tasks</h1>
          {filteredCompleted.length === 0 ? (
            <p>No completed tasks yet.</p>
          ) : (
            filteredCompleted.map((task, index) => (
              <div key={index} className="task completed-task">
                <span>{task.name}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="progress-container">
        <label htmlFor="taskProgress">Progress:</label>
        <progress id="taskProgress" value={progress} max="100" />
        <span id="progressText">{progress}%</span>
      </div>
    </div>
  );
};

export default Dashboard;
