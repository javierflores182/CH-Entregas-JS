// Array global para almacenar las calificaciones
let calificaciones = JSON.parse(localStorage.getItem("calificaciones")) || [
    {DNI: '24', nombre: 'Erika Ramos', nota1: '100', nota2: '97', nota3: '85',nota4:'88.5',notaFinal: '92.63',observacion: 'Sobresaliente(S)'},
    {DNI: '21', nombre: 'Javier Flores', nota1: '87.5', nota2: '87.5', nota3: '98.6',nota4:'97',notaFinal: '92.65',observacion: 'Sobresaliente(S)'},
    {DNI: '22', nombre: 'cinthia lopez', nota1: '69', nota2: '75', nota3: '67',nota4:'57',notaFinal: '67.00',observacion: 'Bueno(B)'}, 
    {DNI: '23', nombre: 'Arelys Luque', nota1: '69', nota2: '54', nota3: '55',nota4:'40',notaFinal: '54.50',observacion: 'Reprobado(R)'}];


//Arreglo que contiene las observaciones para cada calificacion   
const observaciones = ["Reprobado(R)","Bueno(B)","Muy Bueno(MB)","Sobresaliente(S)"];


// Llamar a la función para llenar la tabla y el combobox cuando la página cargue
window.addEventListener('load',()=>{
    llenarCombo()
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