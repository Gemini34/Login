import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Components/Dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
  });

  const navigate = useNavigate();

  // logout
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login");
    }
  };

  // input change
  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // submit create/edit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTaskId) {
      setTasks(
        tasks.map((t) =>
          t.id === editingTaskId ? { ...t, ...newTask } : t
        )
      );
      setEditingTaskId(null);
    } else {
      setTasks([
        ...tasks,
        { ...newTask, id: tasks.length + 1, status: "new" },
      ]);
    }

    setNewTask({ title: "", description: "", category: "", date: "" });
    setShowForm(false);
  };

  // delete
  const deleteTask = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  // edit
  const editTask = (task) => {
    const confirmEdit = window.confirm("Do you want to edit this task?");
    if (confirmEdit) {
      setEditingTaskId(task.id);
      setNewTask({
        title: task.title,
        description: task.description,
        category: task.category,
        date: task.date,
      });
      setShowForm(true);
    }
  };

  // stats
  const today = new Date().toISOString().split("T")[0];
  const stats = {
    new: tasks.filter((t) => t.date === today).length,
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    failed: tasks.filter((t) => t.status === "failed").length,
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
  <h1>Hello Daniel</h1>
  <div className="button-group">
    <button
      className="create-task-btn"
      onClick={() => setShowForm(!showForm)}
    >
      {showForm ? "✖ Close" : "Create Task"}
    </button>
    <button onClick={handleLogout} className="btn btn-red">
      Logout
    </button>
  </div>
</div>

      {/* Stats */}
      <div className="stats">
        <div className="stat-card bg-blue">
          <p>New Tasks</p>
          <h2>{stats.new}</h2>
        </div>
        <div className="stat-card bg-yellow">
          <p>Total Tasks</p>
          <h2>{stats.total}</h2>
        </div>
        <div className="stat-card bg-green">
          <p>Completed</p>
          <h2>{stats.completed}</h2>
        </div>
        <div className="stat-card bg-red">
          <p>Not Completed</p>
          <h2>{stats.failed}</h2>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <form className="create-task-form" onSubmit={handleSubmit}>
          <h2>{editingTaskId ? "Edit Task" : "Create New Task"}</h2>
          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={newTask.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Task description"
            value={newTask.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newTask.category}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={newTask.date}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-green">
            {editingTaskId ? "Update Task" : "Create"}
          </button>
        </form>
      )}

      {/* Task List */}
      <div className="task-section">
        <h2>My Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks yet. Create one!</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className={`task-item ${task.status}`}>
                <div>
                  <strong>{task.title}</strong> <span>({task.category})</span>
                  <p>{task.description}</p>
                  <small>Due: {task.date}</small>
                </div>
                <div className="actions">
                  {task.status === "new" && (
                    <>
                      <button
                        onClick={() => editTask(task)}
                        className="btn btn-yellow"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="btn btn-red"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() =>
                          setTasks(
                            tasks.map((t) =>
                              t.id === task.id ? { ...t, status: "completed" } : t
                            )
                          )
                        }
                        className="btn btn-green"
                      >
                        Completed
                      </button>
                      <button
                        onClick={() =>
                          setTasks(
                            tasks.map((t) =>
                              t.id === task.id ? { ...t, status: "failed" } : t
                            )
                          )
                        }
                        className="btn btn-red"
                      >
                        Not Completed
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
