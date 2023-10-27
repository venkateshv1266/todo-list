document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Retrieve tasks from local storage if available
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function updateLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function createTaskElement(taskText, taskId) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text ${tasks[taskId].completed ? 'completed' : ''}" id="task-${taskId}">${taskText}</span>
            <span class="edit" onclick="editTask(${taskId})">Edit</span>
            <span class="delete" onclick="deleteTask(${taskId})">Delete</span>
        `;
        return li;
    }

    renderTasks();



    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, taskId) => {
            taskList.appendChild(createTaskElement(task.text, taskId));
        });
    }

    renderTasks();

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value;
        if (taskText.trim() === "") return;
        tasks.push({ text: taskText });
        updateLocalStorage();
        taskInput.value = "";
        renderTasks();
    });

    window.deleteTask = function (taskId) {
        tasks.splice(taskId, 1);
        updateLocalStorage();
        renderTasks();
    };

    window.editTask = function (taskId) {
        const taskTextElement = document.getElementById(`task-${taskId}`);
        const taskText = taskTextElement.innerText;

        const updatedTaskText = prompt("Edit task:", taskText);

        if (updatedTaskText !== null) {
            tasks[taskId].text = updatedTaskText;
            updateLocalStorage();
            renderTasks();
        }
    }

});
