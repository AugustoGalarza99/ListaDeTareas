const taskInput = document.getElementById("task");
const taskList = document.getElementById("task-list");

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const taskItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.addEventListener("change", function() {
        if (this.checked) {
            taskItem.classList.add("completed");
        } else {
            taskItem.classList.remove("completed");
        }
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("button-eliminar")
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", function() {
        taskItem.remove();
    });

    taskItem.textContent = taskText;
    taskItem.appendChild(checkbox);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);

    taskInput.value = "";
}

function deleteCompletedTasks() {
    const tasks = document.querySelectorAll("li");
    tasks.forEach(task => {
        const checkbox = task.querySelector("input[type='checkbox']");
        if (checkbox.checked) {
            task.remove();
        }
    });
}