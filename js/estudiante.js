// Array global para almacenar los estudiantes
// let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [
//     {DNI: '21', nombre: 'Javier', apellido: 'Flores'},
//     {DNI: '22', nombre: 'cinthia', apellido: 'lopez'}, 
//     {DNI: '23', nombre: 'Arelys', apellido: 'Luque'},
//     {DNI: '24', nombre: 'Erika', apellido: 'Ramos'}];
let estudiantes;


//funcion para obtener la informacion desde JSON
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
window.addEventListener('load', async () => {
    // Llama a la función para habilitar/deshabilitar los botones.
    controlBotones(true, false, false);

    // Llamar a la función para inicializar los estudiantes y esperar que termine
    await inicializarEstudiantes();

    // Llama a la función para llenar de información la tabla.
    llenarTabla();
});



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


//funcion que muestra mensajes mediante sweetalert
function mensaje(proceso){
    //proceso=1=almacenar/editar
    //proceso=2=eliminar
    let titulo,texto,icono
    if(proceso===1){
        titulo="Estudiante almacenado!"
        texto="El registro se almaceno de manera correcta!"
        icono="success"
    }
    else{
        titulo="Estudiante eliminado!"
        texto="El registro se elimino de manera correcta!"
        icono="error"
    }
    //codigo se sweet alert
    Swal.fire({
        title: titulo,
        text: texto,
        icon: icono
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
        //if(existeEstudiante(camposForm[0].value)){
        //     //alert("El registro que esta intentando ingresar ya existe.")
        //     editarEstudiante(camposForm[0].value, camposForm[1].value, camposForm[2].value)
        //     llenarTabla()
        // }
        // else{
            crearEstudiante(camposForm[0].value, camposForm[1].value, camposForm[2].value) 
            llenarTabla()
            mensaje(1)
        //}
    }
})


//llama a la funcion guardar cuando el usuario presiona el boton guardar.
const botonEditar =document.getElementById('editar')
botonEditar.addEventListener("click",  function(event){
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
            editarEstudiante(camposForm[0].value, camposForm[1].value, camposForm[2].value,posicionArray)
            llenarTabla()
            mensaje(1)
        }
    }
})


//llama a la funcion guardar cuando el usuario presiona el boton guardar.
const botonEliminar =document.getElementById('eliminar')
botonEliminar.addEventListener("click",  function(event){
    //esta linea evita que se recargue la pagina.
    event.preventDefault();
    Swal.fire({
        title: "Desea eliminar la informacion del estudiante?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Si",
        denyButtonText: `No`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            eliminarEstudiante(posicionArray)
        } 
        // else if (result.isDenied) {
        //   Swal.fire("Changes are not saved", "", "info");
        // }
      });



    //esta linea evita que se recargue la pagina.
    // event.preventDefault();

    // let contieneDatos=true
    // const camposForm = document.querySelectorAll('#GestionAlumnos #agregarAlumno .form-control');
    // camposForm.forEach(elemento => {
    //     contieneDatos = (elemento.value==="") ? false : true
    //       if (contieneDatos===false){
    //           return
    //       }
    // });
    // if (contieneDatos){
    //     if(existeEstudiante(camposForm[0].value)){
    //         editarEstudiante(camposForm[0].value, camposForm[1].value, camposForm[2].value,posicionArray)
    //         llenarTabla()
    //         mensaje()
    //     }
    // }
})




// Función para llenar la tabla con los datos de estudiantes
function llenarTabla() {
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


// llama a la funcion para obtener la posicion del array seleccionado en caso de existir
const estudianteIngresado = document.querySelector('#agregarAlumno #DNI');
estudianteIngresado.addEventListener("keyup", function(event) {
    posicionArray=obtenerPosInformacionArray(event.target.value)
    obtenerPosInformacion(posicionArray)
});

 

// funcion para obtener la posicion del array seleccionado en caso de existir
function obtenerPosInformacionArray(DNI){
    const buscarEstudiante = estudiantes.findIndex(function(cal) {
        return cal.DNI === DNI;
    });
    return buscarEstudiante
}


//despliega los valores en cuadros de texto.
function obtenerPosInformacion(posicion){
    const camposForm = document.querySelectorAll('#GestionAlumnos #agregarAlumno .form-control');
    if (posicion !==-1){
        camposForm[1].value=estudiantes[posicion].nombre
        camposForm[2].value=estudiantes[posicion].apellido
        controlBotones(false,true,true)
    }
    else{
        camposForm[1].value=""
        camposForm[2].value=""
        controlBotones(true,false,false)
    }
}


//FUNCION QUE HABILITA/DESHABILITA LOS BOTONES SEGUN EL CASO.
function controlBotones(guardar,editar,eliminar){
    const botonesForm = document.querySelectorAll('#GestionAlumnos #agregarAlumno .botones');
    guardar ? botonesForm[0].removeAttribute("disabled",guardar):botonesForm[0].setAttribute("disabled",guardar)
    editar ? botonesForm[1].removeAttribute("disabled",editar):botonesForm[1].setAttribute("disabled",editar)
    eliminar ? botonesForm[2].removeAttribute("disabled",eliminar):botonesForm[2].setAttribute("disabled",eliminar)
}


// Función para editar un estudiante existente.
function editarEstudiante(DNI, nombre, apellido,posicion) {
    estudiantes[posicion].DNI=DNI
    estudiantes[posicion].nombre=nombre
    estudiantes[posicion].apellido=apellido
    localStorage.setItem("estudiantes",JSON.stringify(estudiantes));
 }


 // Función para editar un estudiante existente.
function eliminarEstudiante(posicion) {
    console.log(posicion)
    estudiantes.splice(posicion, 1);
    // Actualizar el localStorage
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
    mensaje(2)
    // estudiantes[posicion].DNI=DNI
    // estudiantes[posicion].nombre=nombre
    // estudiantes[posicion].apellido=apellido
    // localStorage.setItem("estudiantes",JSON.stringify(estudiantes));
 }

//14/20