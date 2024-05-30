// Array global para almacenar los estudiantes
let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];



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



const botonGuardar =document.getElementById('guardar')
botonGuardar.addEventListener("click", ()=>{
    let contieneDatos=true
    const camposForm = document.querySelectorAll('#GestionAlumnos #agregarAlumno .form-control');
    // camposForm.forEach(elemento => {
    //     // contieneDatos = (elemento.value==="") ? false : true
    //     // if (contieneDatos===false){
    //     //     return
    //     // }
    //     if (elemento.value === "") {
    //         contieneDatos = false; // Si algún campo está vacío, establecemos contieneDatos en false
    //     }
    //   });

     // if (contieneDatos){
        crearEstudiante(camposForm[0].value, camposForm[1].value, camposForm[2].value) 
    //  }
})






