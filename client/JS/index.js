let form = document.getElementById("task-form");
let inputTitle = document.getElementById("title");
let inputDescription = document.getElementById("description");
let taskBody = document.getElementById("task-body");

document.addEventListener("DOMContentLoaded", loadTasks);

const API_URL = "https://todo-fullstack-0l8e.onrender.com/api/tasks";
async function loadTasks() {
  try {
    const res = await fetch(API_URL);
    const tasks = await res.json();

    // Limpia el tbody antes de agregar nuevas filas
    taskBody.innerHTML = "";

    // Por cada tarea, crea una fila
    tasks.forEach(task => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>
          <button class="delete-btn" data-id="${task.id}">Delete</button>
        </td>
      `;

      taskBody.appendChild(tr);
    });
  } catch (error) {
    console.error("Error al cargar tareas:", error);
  }
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  const title = inputTitle.value;
  const description = inputDescription.value;
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    loadTasks();
    form.reset();
  } catch (error) {
    console.error("Error al agregar tarea:", error);
  }
});

taskBody.addEventListener("click", async e => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.dataset.id;
    if (confirm("¿Eliminar esta tarea?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        loadTasks();
      } catch (error) {
        console.error("Error al eliminar tarea:", error);
      }
    }
  }
});
