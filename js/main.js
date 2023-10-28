const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const clearCompletedButton = document.getElementById('clearCompleted');
let tasks = [];

document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();
});

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTaskFromInput();
  }
});

addTaskButton.addEventListener('click', () => {
  addTaskFromInput();
});

taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('task')) {
    const taskId = e.target.getAttribute('data-id');
    toggleTaskCompleted(taskId);
  } else if (e.target.classList.contains('deleteTask')) {
    const taskId = e.target.parentElement.getAttribute('data-id');
    deleteTask(taskId);
  }
});

clearCompletedButton.addEventListener('click', () => {
  clearCompletedTasks();
});

function loadTasksFromLocalStorage() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
}

function addTaskFromInput() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  addTask(taskText);
  taskInput.value = '';
}

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

function toggleTaskCompleted(taskId) {
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId));
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasksToLocalStorage();
    renderTasks();
  }
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== parseInt(taskId));
  saveTasksToLocalStorage();
  renderTasks();
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  saveTasksToLocalStorage();
  renderTasks();
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
renderTasks();

//API DEL CLIMA
const ciudadGeolocalizada = document.getElementById("ciudad-geolocalizada");
const temperaturaGeolocalizada = document.getElementById("temperatura-geolocalizada");
const informacionGeolocalizada = document.getElementById("informacion-geolocalizada");
const humedadGeolocalizada = document.getElementById("humedad-geolocalizada");
const vientoGeolocalizado = document.getElementById("viento-geolocalizado");
const iconoGeolocalizado = document.getElementsByClassName("caja-ciudad");
const permitirUbicacion = document.getElementById("permitir-ubicacion");
const claveAPI = "01d0fccbf98a66fab9b504ea4ffcc847";

function clima(){
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let latitud = position.coords.latitude;
      let longitud = position.coords.longitude;
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=01d0fccbf98a66fab9b504ea4ffcc847&lang=es&units=metric`;
      
      fetch(url)
        .then(respuesta => respuesta.json())
        .then(info => {
          
          let ciudad = info.name;
          ciudadGeolocalizada.textContent = ciudad;

          let temperatura = info.main.temp;
          temperaturaGeolocalizada.textContent = `${temperatura} °C`

          let informacion = info.weather[0].description;
          informacionGeolocalizada.textContent = informacion.toUpperCase();

          let humedad = info.main.humidity;
          humedadGeolocalizada.textContent = `${humedad} %`

          let viento = ((info.wind.speed) * 3.6).toFixed(2);
          vientoGeolocalizado.textContent = `${viento} Km/h`;

          let icono = info.weather[0].icon;

          let img = document.createElement("img");
          img.src = `http://openweathermap.org/img/wn/${icono}.png`;
          img.classList.add("icono")
          iconoGeolocalizado[0].appendChild(img);
        })
        .catch(error => console.error(error));
    });
  } else {
    console.log("Geolocalización no disponible en este navegador");
  }
}
clima();