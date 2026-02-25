const API = "http://localhost:5000/api/tasks";

async function fetchTasks() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  data.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${task.text}
      <button onclick="deleteTask('${task._id}')">Delete</button>
    `;
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("taskInput");

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input.value })
  });

  input.value = "";
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  fetchTasks();
}

fetchTasks();