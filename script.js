let taskList = [];

function addTask() {
    let taskInput = document.getElementById("task-input").value;
    let dueDate = document.getElementById("due-date").value;
    let priority = document.getElementById("priority").value;

    if (taskInput === "") {
        alert("Please enter a task.");
        return;
    }

    let task = {
        id: Date.now(),
        task: taskInput,
        dueDate: dueDate,
        priority: priority,
        status: "pending"
    };

    taskList.push(task);
    displayTasks();
    clearInputs();
}

function displayTasks() {
    let taskListContainer = document.getElementById("task-list");
    taskListContainer.innerHTML = "";
    
    taskList.forEach(task => {
        let taskElement = document.createElement("li");
        taskElement.innerHTML = `
            <span>${task.task}</span> 
            <span>Due: ${task.dueDate}</span> 
            <span>Priority: ${task.priority}</span>
            <button onclick="toggleTaskStatus(${task.id})">${task.status === "pending" ? "Complete" : "Undo"}</button>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskListContainer.appendChild(taskElement);
    });
}

function toggleTaskStatus(taskId) {
    let task = taskList.find(t => t.id === taskId);
    task.status = task.status === "pending" ? "completed" : "pending";
    displayTasks();
}

function editTask(taskId) {
    let task = taskList.find(t => t.id === taskId);
    let newTask = prompt("Edit task:", task.task);
    if (newTask) {
        task.task = newTask;
        displayTasks();
    }
}

function deleteTask(taskId) {
    taskList = taskList.filter(t => t.id !== taskId);
    displayTasks();
}

function clearInputs() {
    document.getElementById("task-input").value = "";
    document.getElementById("due-date").value = "";
    document.getElementById("priority").value = "medium";
}

displayTasks();
