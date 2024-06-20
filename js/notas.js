// Array global para almacenar los estudiantes
// let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [
//     {DNI: '21', nombre: 'Javier', apellido: 'Flores'},
//     {DNI: '22', nombre: 'cinthia', apellido: 'lopez'}, 
//     {DNI: '23', nombre: 'Arelys', apellido: 'Luque'},
//     {DNI: '24', nombre: 'Erika', apellido: 'Ramos'}];

let estudiantes;


//funcion para obtener la informacion desde JSON (estudiantes)
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


// Array global para almacenar las calificaciones
// let calificaciones = JSON.parse(localStorage.getItem("calificaciones")) || [
//     {DNI: '24', nombre: 'Erika Ramos', nota1: '100', nota2: '97', nota3: '85',nota4:'88.5',notaFinal: '92.63',observacion: 'Sobresaliente(S)'},
//     {DNI: '21', nombre: 'Javier Flores', nota1: '87.5', nota2: '87.5', nota3: '98.6',nota4:'97',notaFinal: '92.65',observacion: 'Sobresaliente(S)'},
//     {DNI: '22', nombre: 'cinthia lopez', nota1: '69', nota2: '75', nota3: '67',nota4:'57',notaFinal: '67.00',observacion: 'Bueno(B)'}, 
//     {DNI: '23', nombre: 'Arelys Luque', nota1: '69', nota2: '54', nota3: '55',nota4:'40',notaFinal: '54.50',observacion: 'Reprobado(R)'}];

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
    console.log(estudiantes);
}



//variable que almacena la posicion del valor seleccionado a traves del combo.
let posicionArray=-1



// Llamar a la función para llenar la tabla y el combobox cuando la página cargue
window.addEventListener('load',async () =>{
     //llama a la funcion para habilitar/deshabilitar los botones.
     controlBotones(true,false,false)
     // Llamar a la función para inicializar los estudiantes
    await inicializarEstudiantes()
    //llama a la funcion para llenar el combo de estudiantes
    llenarCombo()
     // Llamar a la función para inicializar las calificaciones
    await inicializarCalificaciones()
    //llama a la funcion para llenar de informacion la tabla.
    llenarTabla()
} );




// Función para llenar la combo box con los datos de estudiantes
function llenarCombo() {
    const select = document.querySelector('#agregarNotas select');
    estudiantes.forEach(estudiante => {
        const elementoOption = document.createElement('option');
        elementoOption.textContent = estudiante.nombre + ' '+estudiante.apellido ;
        elementoOption.value = estudiante.DNI;
        select.appendChild(elementoOption);
        select.selectedIndex=-1
    });
}


// Función para crear una nueva calificacion y agregarlo al arreglo de notas
function crearCalificacion(DNI, nombre, nota1,nota2,nota3,nota4,promedio,obs) {
    const calificacion = {
        DNI: DNI,
        nombre: nombre,
        nota1:nota1,
        nota2:nota2,
        nota3:nota3,
        nota4:nota4,
        notaFinal: promedio,
        observacion: obs
   };
   calificaciones.push(calificacion);
   localStorage.setItem("calificaciones",JSON.stringify(calificaciones));
}


// Función para editar una calificacion existente.
function editarCalificacion(DNI, nombre, nota1,nota2,nota3,nota4,promedio,obs,posicion) {
   calificaciones[posicion].DNI=DNI
   calificaciones[posicion].nombre=nombre
   calificaciones[posicion].nota1=nota1
   calificaciones[posicion].nota2=nota2
   calificaciones[posicion].nota3=nota3
   calificaciones[posicion].nota4=nota4
   calificaciones[posicion].notaFinal=promedio
   calificaciones[posicion].observacion=obs
   localStorage.setItem("calificaciones",JSON.stringify(calificaciones));
}



//funciona para calcular el promedio al cambiar un valor de las notas
// Obtener todos los elementos de clase "notas"
let notasInputs = document.querySelectorAll(".notas");
console.log("notasInputs",notasInputs);
// Agregar un evento "change" a cada uno
notasInputs.forEach(function(input) {
    input.addEventListener("change", function() {
        // Obtener los valores de las notas
        let clase1= (isNaN(parseFloat(document.getElementById("clase1").value)))?0:parseFloat(document.getElementById("clase1").value);
        let clase2= (isNaN(parseFloat(document.getElementById("clase2").value)))?0:parseFloat(document.getElementById("clase2").value);
        let clase3= (isNaN(parseFloat(document.getElementById("clase3").value)))?0:parseFloat(document.getElementById("clase3").value);
        let clase4= (isNaN(parseFloat(document.getElementById("clase4").value)))?0:parseFloat(document.getElementById("clase4").value);
        
        // Calcular el promedio
        let promedio = (clase1 + clase2 + clase3 + clase4) / 4;
        
        // Actualizar el valor del input de promedio
        document.getElementById("promedio").value = promedio.toFixed(2);

        //llama a la funcion para mostrar la observacion en el textbox
        observacion(promedio)

    });
});



//EN BASE AL PROMEDIO OBTENIDO, GENERA UNA OBSERVACION    
function observacion(notaFinal){
    let obs=""
    if(notaFinal<60){
        obs="Reprobado(R)"
    }
    if(notaFinal>=60 && notaFinal<79){
        obs="Bueno(B)"
    }
    if(notaFinal>=80 && notaFinal<89){
        obs="Muy Bueno(MB)"
    }
    if(notaFinal>=90){
         obs="Sobresaliente(S)"
    }
    
    // Actualizar el valor del input de observación
    document.getElementById("obs").value = obs;
    //return obs
}


function mensaje(proceso){
    //proceso=1=almacenar/editar
    //proceso=2=eliminar
    let titulo,texto,icono
    if(proceso===1){
        titulo="Calificación almacenada!"
        texto="El registro se almaceno de manera correcta!"
        icono="success"
    }
    else{
        titulo="Calificación eliminada!"
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

//Funcion que verifica la existencia de la calificacion
function existeCalificacion(DNI){
    const existe = (calificaciones.find((estudiante)=>estudiante.DNI===DNI))? true : false
    return existe
}



//guarda o edita segun sea la situacion al presionar el boton guardar.
const botonGuardar =document.getElementById('guardar')
botonGuardar.addEventListener("click", ()=>{

    let contieneDatos=true
    const camposForm = document.querySelectorAll('#GestionNotas #agregarNotas .objetos');

    camposForm.forEach(elemento => {
        if (elemento.value === "" || parseFloat(elemento.value) < 0 || parseFloat(elemento.value) > 100) {
            contieneDatos = false;
            return;
        }
     });

    if (!contieneDatos){
        if(existeCalificacion(camposForm[0].value)){
        //     editarCalificacion(camposForm[0].value,camposForm[0].options[camposForm[0].selectedIndex].text, camposForm[1].value, camposForm[2].value, camposForm[3].value, camposForm[4].value, camposForm[5].value, camposForm[6].value,posicionArray) 
        //     llenarTabla()
        // }
        // else{
            crearCalificacion(camposForm[0].value,camposForm[0].options[camposForm[0].selectedIndex].text, camposForm[1].value, camposForm[2].value, camposForm[3].value, camposForm[4].value, camposForm[5].value, camposForm[6].value) 
            llenarTabla()
            mensaje(1)
        }
    }
})


//llama a la funcion guardar cuando el usuario presiona el boton guardar.
const botonEditar =document.getElementById('editar')
botonEditar.addEventListener("click",  function(event){
    //esta linea evita que se recargue la pagina.
    event.preventDefault();

    let contieneDatos=true
    const camposForm = document.querySelectorAll('#GestionNotas #agregarNotas .objetos');
    camposForm.forEach(elemento => {
        contieneDatos = (elemento.value==="") ? false : true
          if (contieneDatos===false){
              return
          }
    });
    if (contieneDatos){
        if(existeCalificacion(camposForm[0].value)){
            editarCalificacion(camposForm[0].value,camposForm[0].options[camposForm[0].selectedIndex].text, camposForm[1].value, camposForm[2].value, camposForm[3].value, camposForm[4].value, camposForm[5].value, camposForm[6].value,posicionArray) 
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
            eliminarCalificaciones(posicionArray)
        } 
        // else if (result.isDenied) {
        //   Swal.fire("Changes are not saved", "", "info");
        // }
      });
    })


// Función para llenar la tabla con los datos de las calificaciones
function llenarTabla() {
    const tbody = document.querySelector('#tablaNotas tbody');
    calificaciones.forEach(calificacion => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <th scope="row">${calificacion.DNI}</th>
            <td>${calificacion.nombre} ${calificacion.apellido} </td>
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




// llama a la funcion para obtener la posicion del array seleccionado en caso de existir
const estudianteSeleccionado = document.querySelector('#agregarNotas select');
estudianteSeleccionado.addEventListener("change", function(event) {
    posicionArray=obtenerPosInformacionArray(event.target.value)
    obtenerPosInformacion(posicionArray)
});


// funcion para obtener la posicion del array seleccionado en caso de existir
function obtenerPosInformacionArray(DNI){
    const buscarCalificiaciones = calificaciones.findIndex(function(cal) {
        return cal.DNI === DNI;
    });
    return buscarCalificiaciones
}


//despliega los valores en cuadros de texto.
function obtenerPosInformacion(posicion){
    const camposForm = document.querySelectorAll('#GestionNotas #agregarNotas .form-control');
    if (posicion !==-1){
        camposForm[0].value=calificaciones[posicion].nota1
        camposForm[1].value=calificaciones[posicion].nota2
        camposForm[2].value=calificaciones[posicion].nota3
        camposForm[3].value=calificaciones[posicion].nota4
        camposForm[4].value=calificaciones[posicion].notaFinal
        camposForm[5].value=calificaciones[posicion].observacion   
        controlBotones(false,true,true)
    }
    else{
        camposForm[0].value=""
        camposForm[1].value=""
        camposForm[2].value=""
        camposForm[3].value=""
        camposForm[4].value=""
        camposForm[5].value=""
        controlBotones(true,false,false)
    }
}

//FUNCION QUE HABILITA/DESHABILITA LOS BOTONES SEGUN EL CASO.
function controlBotones(guardar,editar,eliminar){
    const botonesForm = document.querySelectorAll('#GestionNotas #agregarNotas .botones');
    guardar ? botonesForm[0].removeAttribute("disabled",guardar):botonesForm[0].setAttribute("disabled",guardar)
    editar ? botonesForm[1].removeAttribute("disabled",editar):botonesForm[1].setAttribute("disabled",editar)
    eliminar ? botonesForm[2].removeAttribute("disabled",eliminar):botonesForm[2].setAttribute("disabled",eliminar)
}


 // Función para editar un estudiante existente.
 function eliminarCalificaciones(posicion) {
    calificaciones.splice(posicion, 1);
    // Actualizar el localStorage
    localStorage.setItem("calificaciones", JSON.stringify(calificaciones));
    mensaje(2)
 }


// // Función para crear un nuevo estudiante y agregarlo al arreglo de estudiantes
// function crearEstudiante(nombre, cantidadNotas, notas) {
//     const estudiante = {
//         nombre: nombre,
//         cantidadNotas: cantidadNotas,
//         notas: notas,
//         notaFinal: calcularPromedio(notas),
//         observacion: observacion(calcularPromedio(notas))
//     };
//     console.log(estudiante)
//     estudiantes.push(estudiante);
//     console.log(estudiantes)
// }



// //OBTIENE EL NOMBRE DEL ESTUDIANTE
// let IngreseNombreUsuario=()=>{
//     let nombreUsuario=""
//     do {
//         nombreUsuario = prompt("Ingrese el nombre del estudiante:")
//       } while (nombreUsuario==="");
//     return nombreUsuario
// }


// //OBTIENE CUANTAS NOTAS O CALIFICACIONES QUIERE INGRESAR EL USUARIO.
// function IngresoCantidadNotas(nombreUsuario){
//     let cantidadNotas=0
//     do {
//         cantidadNotas= parseInt(prompt("Ingrese la cantidad de calificaciones a digitar:"))
//       } while (cantidadNotas===0 || Number.isNaN(cantidadNotas));

//       const validar=confirm("Desea ingresar la cantidad de "+cantidadNotas+" calificaciones para el/la estudiante "+nombreUsuario+"?")
//       if(validar==false){
//         IngresoCantidadNotas(nombreUsuario)
//       } 
//       return cantidadNotas
// }


// // Función para iniciar el proceso de ingreso de notas por parte del usuario
// function IngresoNotas(cantidadNotas) {
//     const notas = [];
//     for (let i = 1; i <= cantidadNotas; i++) {
//         let nota;
//         do {
//             nota = parseFloat(prompt(`Ingrese la calificación de la nota ${i}/${cantidadNotas}`));
//             if (nota < 0 || nota > 100 || Number.isNaN(nota)) {
//                 alert("El valor ingresado es incorrecto. Debe ingresar calificaciones entre 0 y 100.");
//             }
//         } while (nota < 0 || nota > 100 || Number.isNaN(nota));
//         notas.push(nota);
//     }
//     console.log(`Notas: ${notas}`)
//     return notas;
// }



// // Función para calcular el promedio de un arreglo de notas
// function calcularPromedio(notas) {
//     const totalNotas = notas.reduce((acumulador, nota) => acumulador + nota, 0);
//     console.log(`total Notas reduce: ${totalNotas}`)
//     return totalNotas / notas.length;
// }


// //EN BASE AL PROMEDIO OBTENIDO, GENERA UNA OBSERVACION    
// function observacion(notaFinal){
//     let obs=""
//     if(notaFinal<60){
//         obs="Reprobado(R)"
//     }
//     if(notaFinal>=60 && notaFinal<=79){
//         obs="Bueno(B)"
//     }
//     if(notaFinal>=80 && notaFinal<=89){
//         obs="Muy Bueno(MB)"
//     }
//     if(notaFinal>=90){
//          obs="Sobresaliente(S)"
//     }
//     return obs
// }



// // Función para imprimir el mensaje del estudiante y su promedio
// function ImprimirMensaje(nombre) {
//     const estudiante = buscarPorNombre(nombre);
//     alert(`La calificación final (Promedio) para el/la estudiante ${nombre} es de ${estudiante.notaFinal.toFixed(2)}%. Por lo que su nivel es: ${estudiante.observacion}`);
// }


// // Función para buscar un estudiante por nombre
// function buscarPorNombre(nombre) {
//     return estudiantes.find(estudiante => estudiante.nombre.toLowerCase() === nombre.toLowerCase());
// }


// // Función para filtrar estudiantes por observación
// function filtrarPorObservacion(observacion) {
//     return estudiantes.filter(estudiante => estudiante.observacion === observacion);
// }

// // Función para iniciar el proceso de ingreso de información por parte del usuario
// function iniciarProceso() {
//     let continuar = false;
//     do {
//         const nombre = IngreseNombreUsuario();
//         const cantidadNotas = IngresoCantidadNotas(nombre);
//         const notas = IngresoNotas(cantidadNotas);
//         crearEstudiante(nombre, cantidadNotas, notas);
//         ImprimirMensaje(nombre);
//         continuar = confirm("Desea ingresar información de otro estudiante?");
//     } while (continuar);
// }


// // Función para mostrar un mensaje de resumen en formato de tabla
// function mensajeResumen() {

//     let estudiantesObs = [];
//     let obs = ["Reprobado(R)","Bueno(B)","Muy Bueno(MB)","Sobresaliente(S)"];

//     for(let i=0;i<=obs.length-1;i++){
//         let mensaje = "";
//         mensaje = "Resumen de Promedios: " + obs[i] +"\n";
//         mensaje += "Estudiante(s)\t\tNota(s)\n";

//         estudiantesObs = filtrarPorObservacion(obs[i])
        
//         estudiantesObs.forEach(estudiante => {
//             mensaje += `${estudiante.nombre}\t\t\t${estudiante.notaFinal.toFixed(2)}%\n`;
//         });

//         if(estudiantesObs.length===0){
//             mensaje +="NO hay alumnos con observación: "+ obs[i]
//         }

//         alert(mensaje);
//     }
// }

// //INICIO DE PROCESO: MENSAJE DE BIENVENIDA A LA PAGINA.
// alert("Bienvenid@ a mi SEGUNDA pre entrega, Simulador de calculo de calificaciones.\nPor: Javier Flores.")


// //LLAMADO DE LA FUNCION PARA INICIAR EL PROCESO DE INGRESO DE LA INFORMACION POR PARTE DEL USUARIO.
// iniciarProceso()


// //LLAMA A LA FUNCION PARA MOSTRAR EL MENSAJE DE RESUMEN.
// mensajeResumen()
