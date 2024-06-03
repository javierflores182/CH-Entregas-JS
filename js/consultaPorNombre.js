// Array global para almacenar las calificaciones
let calificaciones = JSON.parse(localStorage.getItem("calificaciones")) || [
    {DNI: '24', nombre: 'Erika Ramos', nota1: '100', nota2: '97', nota3: '85',nota4:'88.5',notaFinal: '92.63',observacion: 'Sobresaliente(S)'},
    {DNI: '21', nombre: 'Javier Flores', nota1: '87.5', nota2: '87.5', nota3: '98.6',nota4:'97',notaFinal: '92.65',observacion: 'Sobresaliente(S)'},
    {DNI: '22', nombre: 'cinthia lopez', nota1: '69', nota2: '75', nota3: '67',nota4:'57',notaFinal: '67.00',observacion: 'Bueno(B)'}, 
    {DNI: '23', nombre: 'Arelys Luque', nota1: '69', nota2: '54', nota3: '55',nota4:'40',notaFinal: '54.50',observacion: 'Reprobado(R)'}];



// Llamar a la función para llenar la tabla cuando la página cargue
window.addEventListener('load',()=>{
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
textoNombres.addEventListener("change", function() {
    let valorIngresado= textoNombres.value;
    llenarTabla(buscarPorNombre(valorIngresado));
});
  


// Función para buscar un estudiante por nombre
function buscarPorNombre(nombre) {
    console.log(nombre)
    return calificaciones.filter(calificacion => calificacion.nombre.toLowerCase().includes(nombre.toLowerCase()));
}