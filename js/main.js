// Variables globales
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const clearCompletedButton = document.getElementById('clearCompleted');
let tasks = [];

// Cargar tareas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();
});

// Agregar tarea al presionar Enter
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTaskFromInput();
  }
});

// Agregar tarea
addTaskButton.addEventListener('click', () => {
  addTaskFromInput();
});

// Marcar tarea como completada
taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('task')) {
    const taskId = e.target.getAttribute('data-id');
    toggleTaskCompleted(taskId);
  } else if (e.target.classList.contains('deleteTask')) {
    const taskId = e.target.parentElement.getAttribute('data-id');
    deleteTask(taskId);
  }
});

// Borrar tareas completadas
clearCompletedButton.addEventListener('click', () => {
  clearCompletedTasks();
});

// Función para cargar tareas desde el almacenamiento local (array)
function loadTasksFromLocalStorage() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
}

// Función para agregar una tarea desde el input
function addTaskFromInput() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  addTask(taskText);
  taskInput.value = '';
}

// Función para agregar una tarea
function addTask(text) {
  const newTask = {
    id: Date.now(),
    title: text,
    completed: false,
  };

  tasks.push(newTask);
  saveTasksToLocalStorage();

  renderTasks();
}

// Función para renderizar las tareas en el DOM
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.classList.add('task');
    if (task.completed) {
      li.classList.add('completed');
    }
    li.setAttribute('data-id', task.id);
    li.innerHTML = `
      ${task.title}
      <button class="deleteTask">Eliminar</button>
    `;
    taskList.appendChild(li);
  });
}

// Función para marcar una tarea como completada
function toggleTaskCompleted(taskId) {
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId));
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasksToLocalStorage();
    renderTasks();
  }
}

// Función para eliminar una tarea
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== parseInt(taskId));
  saveTasksToLocalStorage();
  renderTasks();
}

// Función para borrar tareas completadas
function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  saveTasksToLocalStorage();
  renderTasks();
}

// Función para guardar las tareas en el almacenamiento local (array a JSON)
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Inicializar la lista de tareas al cargar la página
renderTasks();
