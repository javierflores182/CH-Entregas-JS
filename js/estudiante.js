// Array global para almacenar los estudiantes
// let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [
//     {DNI: '21', nombre: 'Javier', apellido: 'Flores'},
//     {DNI: '22', nombre: 'cinthia', apellido: 'lopez'}, 
//     {DNI: '23', nombre: 'Arelys', apellido: 'Luque'},
//     {DNI: '24', nombre: 'Erika', apellido: 'Ramos'}];
let estudiantes;

async function inicializarEstudiantes() {
    // Verificar si hay información en el localStorage
    estudiantes = JSON.parse(localStorage.getItem("estudiantes"));

    // Si no hay información, cargar los datos desde estudiantes.json
    if (!estudiantes) {
        try {
            const response = await fetch('../data/estudiantes.json');
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            estudiantes = await response.json();

            // Guardar los datos en localStorage
            localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Ahora la variable estudiantes tiene los datos, ya sea desde el localStorage o desde el JSON
    console.log(estudiantes);
}






// Llamar a la función para llenar la tabla cuando la página cargue
window.addEventListener('load', llenarTabla);


// Función para crear un nuevo estudiante y agregarlo al arreglo de estudiantes
function crearEstudiante(DNI, nombre, apellido) {
    const estudiante = {
         DNI: DNI,
         nombre: nombre,
         apellido: apellido
    };
    estudiantes.push(estudiante);
    localStorage.setItem("estudiantes",JSON.stringify(estudiantes));
}


function mensaje(){
    Swal.fire({
        title: "Estudiante almacenado!",
        text: "El registro se almaceno de manera correcta!",
        icon: "success"
    }).then(() => {
        location.reload();
    });
}


//Funcion que verifica la existencia del estudiante
function existeEstudiante(DNI){
    const existe = (estudiantes.find((estudiante)=>estudiante.DNI===DNI))? true : false
    return existe
}


//llama a la funcion guardar cuando el usuario presiona el boton guardar.
const botonGuardar =document.getElementById('guardar')
botonGuardar.addEventListener("click",  function(event){
    //esta linea evita que se recargue la pagina.
    event.preventDefault();

    let contieneDatos=true
    const camposForm = document.querySelectorAll('#GestionAlumnos #agregarAlumno .form-control');
    camposForm.forEach(elemento => {
        contieneDatos = (elemento.value==="") ? false : true
          if (contieneDatos===false){
              return
          }
    });
    if (contieneDatos){
        if(existeEstudiante(camposForm[0].value)){
            alert("El registro que esta intentando ingresar ya existe.")
        }
        else{
            crearEstudiante(camposForm[0].value, camposForm[1].value, camposForm[2].value) 
            llenarTabla()
            mensaje()
        }
    }
})



// Función para llenar la tabla con los datos de estudiantes
function llenarTabla() {

    // Llamar a la función para inicializar los estudiantes
    inicializarEstudiantes();

    const tbody = document.querySelector('#tablaAlumno tbody');

    console.table(estudiantes)

    estudiantes.forEach(estudiante => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <th scope="row">${estudiante.DNI}</th>
            <td>${estudiante.nombre}</td>
            <td>${estudiante.apellido}</td>
        `;
        tbody.appendChild(fila);
    });
}



  

