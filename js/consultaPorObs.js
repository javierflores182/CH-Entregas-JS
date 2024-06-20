// Array global para almacenar las calificaciones
let calificaciones
//Arreglo que contiene las observaciones para cada calificacion   
const observaciones = ["Reprobado(R)","Bueno(B)","Muy Bueno(MB)","Sobresaliente(S)"];


//funcion para obtener la informacion desde JSON (calificaciones)
async function inicializarCalificaciones() {
    // Verificar si hay información en el localStorage
    calificaciones = JSON.parse(localStorage.getItem("calificaciones"));

    // Si no hay información, cargar los datos desde estudiantes.json
    if (!calificaciones) {
        try {
            const response = await fetch('../data/notas.json');
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            calificaciones = await response.json();

            // Guardar los datos en localStorage
            localStorage.setItem("calificaciones", JSON.stringify(calificaciones));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Ahora la variable estudiantes tiene los datos, ya sea desde el localStorage o desde el JSON
    console.log(calificaciones);
}


// Llamar a la función para llenar la tabla y el combobox cuando la página cargue
window.addEventListener('load',async () =>{
    // Llamar a la función para inicializar las calificaciones
    await inicializarCalificaciones()
    //llama a la funcion para llenar el combo de observaciones
    llenarCombo()
    //llama a la funcion para llenar la tabla con informacion
    llenarTabla(calificaciones)
} );



// Función para llenar la combo box con los datos de calificaciones
function llenarCombo() {
    const select = document.querySelector('#seleccionarObs select');

    for(let i=0;i<=observaciones.length-1;i++){
        const elementoOption = document.createElement('option');
        elementoOption.textContent = observaciones[i]
        elementoOption.value = observaciones[i]; // Opcional: puedes establecer un valor diferente si lo deseas
        select.appendChild(elementoOption);
        select.selectedIndex=-1
    };
}



// Función para llenar la tabla con los datos de la calificacion
function llenarTabla(cal) {
    const tbody = document.querySelector('#tablaDetalleObs tbody');

    // Limpiar la tabla
    tbody.innerHTML = '';

    cal.forEach(calificacion => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <th scope="row">${calificacion.DNI}</th>
            <td>${calificacion.nombre}</td>
            <td>${calificacion.nota1}</td>
            <td>${calificacion.nota2}</td>
            <td>${calificacion.nota3}</td>
            <td>${calificacion.nota4}</td>
            <td>${calificacion.notaFinal}</td>
            <td>${calificacion.observacion}</td>
        `;
        tbody.appendChild(fila);
    });
}




//llama a la funcion de filtro al seleccionar un valor del combo.
let combo = document.querySelector("#obsSelect");
combo.addEventListener("change", function() {
    const valorSeleccionado = combo.value;
    console.log("Valor seleccionado:", valorSeleccionado);
    llenarTabla(filtrarPorObservacion(valorSeleccionado));
});
  


//funcion para filtrar la informacion de las calificaciones por observacion
function filtrarPorObservacion(observacion) {
    return calificaciones.filter(cal => cal.observacion === observacion);  
}