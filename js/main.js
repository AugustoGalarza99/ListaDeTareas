let tareas = [];

function agregarTarea(veces) {
    for (let i = 0; i < veces; i++){
        const nuevaTarea = prompt("Introduce una nueva tarea:");
        if (nuevaTarea !== null && nuevaTarea.trim() !== "") {
            tareas.push({ tarea: nuevaTarea, completada: false });
            console.log("Tarea agregada: " + nuevaTarea + (i + 1));
        }
    }
}
agregarTarea(4);

function mostrarTareas() {
    console.log("Tareas:");
    tareas.forEach((tarea, index) => {
        console.log(index + 1 + ". " + tarea.tarea + " - Completada: " + tarea.completada);
        alert(index + 1 + ". " + tarea.tarea + " - Completada: " + tarea.completada);
    });
    if (tareas.length === 0) {
        alert("No hay tareas en la lista.");
    }
}
mostrarTareas();

function eliminarTodasLasTareas() {
    if (tareas.length > 0) {
        const confirmacion = confirm("¿Estás seguro de que deseas eliminar todas las tareas?");
        if (confirmacion) {
            tareas = [];
            console.log("Todas las tareas han sido eliminadas.");
        }
    } else {
        alert("No hay tareas para eliminar.");
    }
}
eliminarTodasLasTareas();