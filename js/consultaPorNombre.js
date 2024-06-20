// Array global para almacenar las calificaciones
let calificaciones


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



// Llamar a la función para llenar la tabla cuando la página cargue
window.addEventListener('load',async () =>{
    // Llamar a la función para inicializar las calificaciones
    await inicializarCalificaciones()
    //llama a la funcion para llenar de informacion la tabla.
    llenarTabla(calificaciones)
} );


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



//llama a la funcion de filtro al ingresar un valor en el cuadro de texto.
let textoNombres = document.querySelector("#nombre");
textoNombres.addEventListener("keyup", function() {
    let valorIngresado= textoNombres.value;
    llenarTabla(buscarPorNombre(valorIngresado));
});
  


// Función para buscar un estudiante por nombre
function buscarPorNombre(nombre) {
    console.log(nombre)
    return calificaciones.filter(calificacion => calificacion.nombre.toLowerCase().includes(nombre.toLowerCase()));
}