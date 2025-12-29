const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from LocalStorage
document.addEventListener("DOMContentLoaded", loadTasks);

addTaskBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    const task = {
        text: taskText,
        completed: false
    };

    saveTask(task);
    renderTask(task);

    taskInput.value = "";
}

function renderTask(task) {
    const li = document.createElement("li");

    if (task.completed) {
        li.classList.add("completed");
    }

    li.textContent = task.text;

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        task.completed = !task.completed;
        updateTasks();
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.classList.add("remove-btn");

    removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        updateTasks();
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);
}

function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => renderTask(task));
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function updateTasks() {
    const tasks = [];
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
