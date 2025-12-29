const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks when page loads
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") return;

  const task = {
    text: taskText,
    completed: false
  };

  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
  renderTask(task);

  input.value = "";
}

function renderTask(task) {
  const li = document.createElement("li");
  li.textContent = task.text;

  if (task.completed) {
    li.classList.add("completed");
  }

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTaskStatus(task.text);
  });

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "X";
  removeBtn.classList.add("remove-btn");

  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    removeTask(task.text);
    li.remove();
  });

  li.appendChild(removeBtn);
  taskList.appendChild(li);
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => renderTask(task));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(text) {
  let tasks = getTasks();
  tasks = tasks.filter(task => task.text !== text);
  saveTasks(tasks);
}

function updateTaskStatus(text) {
  const tasks = getTasks();
  tasks.forEach(task => {
    if (task.text === text) {
      task.completed = !task.completed;
    }
  });
  saveTasks(tasks);
}
