// Array global para almacenar los estudiantes
let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

// Array global para almacenar los estudiantes
let calificaciones = JSON.parse(localStorage.getItem("calificaciones")) || [];


// Llamar a la función para llenar la tabla cuando la página cargue
window.addEventListener('load',()=>{
    llenarCombo()
    llenarTabla()
} );


// Función para llenar la combo box con los datos de estudiantes
function llenarCombo() {
    const select = document.querySelector('#agregarNotas select');

    estudiantes.forEach(estudiante => {
        const elementoOption = document.createElement('option');
        elementoOption.textContent = estudiante.nombre + ' '+estudiante.apellido ;
        elementoOption.value = estudiante.DNI; // Opcional: puedes establecer un valor diferente si lo deseas
        select.appendChild(elementoOption);
    });
}

// Función para crear un nuevo estudiante y agregarlo al arreglo de estudiantes
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


//Funcion que verifica la existencia del estudiante
function existeCalificacion(DNI){
    const existe = (calificaciones.find((estudiante)=>estudiante.DNI===DNI))? true : false
    return existe
}


const botonGuardar =document.getElementById('guardar')
botonGuardar.addEventListener("click", ()=>{

    let contieneDatos=true
    const camposForm = document.querySelectorAll('#GestionNotas #agregarNotas .objetos');

    camposForm.forEach(elemento => {
        console.log(camposForm[0].options[camposForm[0].selectedIndex].text)
        contieneDatos = (elemento.value==="") ? false : true
        if (contieneDatos===false){
            return
        }
     });

    if (contieneDatos){
        if(existeCalificacion(camposForm[0].value)){
            alert("El registro que esta intentando ingresar ya existe.")
        }
        else{
            crearCalificacion(camposForm[0].value,camposForm[0].options[camposForm[0].selectedIndex].text, camposForm[1].value, camposForm[2].value, camposForm[3].value, camposForm[4].value, camposForm[5].value, camposForm[6].value) 
            //llenarTabla()
        }
    }
})




// Función para llenar la tabla con los datos de estudiantes
function llenarTabla() {
    const tbody = document.querySelector('#tablaNotas tbody');
    calificaciones.forEach(calificacion => {
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

