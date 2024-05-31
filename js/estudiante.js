// Array global para almacenar los estudiantes
let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];


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
    alert(estudiantes.length)
    localStorage.setItem("estudiantes",JSON.stringify(estudiantes));
}


//Funcion que verifica la existencia del estudiante
function existeEstudiante(DNI){
    const existe = (estudiantes.find((estudiante)=>estudiante.DNI===DNI))? true : false
    return existe
}



const botonGuardar =document.getElementById('guardar')
botonGuardar.addEventListener("click", ()=>{
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
        }
    }
})




    // Función para llenar la tabla con los datos de estudiantes
    function llenarTabla() {
        const tbody = document.querySelector('#tablaAlumno tbody');

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






