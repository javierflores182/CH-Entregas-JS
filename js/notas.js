// Array global para almacenar los estudiantes
let estudiantes = [];



// Función para crear un nuevo estudiante y agregarlo al arreglo de estudiantes
function crearEstudiante(nombre, cantidadNotas, notas) {
    const estudiante = {
        nombre: nombre,
        cantidadNotas: cantidadNotas,
        notas: notas,
        notaFinal: calcularPromedio(notas),
        observacion: observacion(calcularPromedio(notas))
    };
    console.log(estudiante)
    estudiantes.push(estudiante);
    console.log(estudiantes)
}



//OBTIENE EL NOMBRE DEL ESTUDIANTE
let IngreseNombreUsuario=()=>{
    let nombreUsuario=""
    do {
        nombreUsuario = prompt("Ingrese el nombre del estudiante:")
      } while (nombreUsuario==="");
    return nombreUsuario
}


//OBTIENE CUANTAS NOTAS O CALIFICACIONES QUIERE INGRESAR EL USUARIO.
function IngresoCantidadNotas(nombreUsuario){
    let cantidadNotas=0
    do {
        cantidadNotas= parseInt(prompt("Ingrese la cantidad de calificaciones a digitar:"))
      } while (cantidadNotas===0 || Number.isNaN(cantidadNotas));

      const validar=confirm("Desea ingresar la cantidad de "+cantidadNotas+" calificaciones para el/la estudiante "+nombreUsuario+"?")
      if(validar==false){
        IngresoCantidadNotas(nombreUsuario)
      } 
      return cantidadNotas
}


// Función para iniciar el proceso de ingreso de notas por parte del usuario
function IngresoNotas(cantidadNotas) {
    const notas = [];
    for (let i = 1; i <= cantidadNotas; i++) {
        let nota;
        do {
            nota = parseFloat(prompt(`Ingrese la calificación de la nota ${i}/${cantidadNotas}`));
            if (nota < 0 || nota > 100 || Number.isNaN(nota)) {
                alert("El valor ingresado es incorrecto. Debe ingresar calificaciones entre 0 y 100.");
            }
        } while (nota < 0 || nota > 100 || Number.isNaN(nota));
        notas.push(nota);
    }
    console.log(`Notas: ${notas}`)
    return notas;
}



// Función para calcular el promedio de un arreglo de notas
function calcularPromedio(notas) {
    const totalNotas = notas.reduce((acumulador, nota) => acumulador + nota, 0);
    console.log(`total Notas reduce: ${totalNotas}`)
    return totalNotas / notas.length;
}


//EN BASE AL PROMEDIO OBTENIDO, GENERA UNA OBSERVACION    
function observacion(notaFinal){
    let obs=""
    if(notaFinal<60){
        obs="Reprobado(R)"
    }
    if(notaFinal>=60 && notaFinal<=79){
        obs="Bueno(B)"
    }
    if(notaFinal>=80 && notaFinal<=89){
        obs="Muy Bueno(MB)"
    }
    if(notaFinal>=90){
         obs="Sobresaliente(S)"
    }
    return obs
}



// Función para imprimir el mensaje del estudiante y su promedio
function ImprimirMensaje(nombre) {
    const estudiante = buscarPorNombre(nombre);
    alert(`La calificación final (Promedio) para el/la estudiante ${nombre} es de ${estudiante.notaFinal.toFixed(2)}%. Por lo que su nivel es: ${estudiante.observacion}`);
}


// Función para buscar un estudiante por nombre
function buscarPorNombre(nombre) {
    return estudiantes.find(estudiante => estudiante.nombre.toLowerCase() === nombre.toLowerCase());
}


// Función para filtrar estudiantes por observación
function filtrarPorObservacion(observacion) {
    return estudiantes.filter(estudiante => estudiante.observacion === observacion);
}

// Función para iniciar el proceso de ingreso de información por parte del usuario
function iniciarProceso() {
    let continuar = false;
    do {
        const nombre = IngreseNombreUsuario();
        const cantidadNotas = IngresoCantidadNotas(nombre);
        const notas = IngresoNotas(cantidadNotas);
        crearEstudiante(nombre, cantidadNotas, notas);
        ImprimirMensaje(nombre);
        continuar = confirm("Desea ingresar información de otro estudiante?");
    } while (continuar);
}


// Función para mostrar un mensaje de resumen en formato de tabla
function mensajeResumen() {

    let estudiantesObs = [];
    let obs = ["Reprobado(R)","Bueno(B)","Muy Bueno(MB)","Sobresaliente(S)"];

    for(let i=0;i<=obs.length-1;i++){
        let mensaje = "";
        mensaje = "Resumen de Promedios: " + obs[i] +"\n";
        mensaje += "Estudiante(s)\t\tNota(s)\n";

        estudiantesObs = filtrarPorObservacion(obs[i])
        
        estudiantesObs.forEach(estudiante => {
            mensaje += `${estudiante.nombre}\t\t\t${estudiante.notaFinal.toFixed(2)}%\n`;
        });

        if(estudiantesObs.length===0){
            mensaje +="NO hay alumnos con observación: "+ obs[i]
        }

        alert(mensaje);
    }
}

//INICIO DE PROCESO: MENSAJE DE BIENVENIDA A LA PAGINA.
alert("Bienvenid@ a mi SEGUNDA pre entrega, Simulador de calculo de calificaciones.\nPor: Javier Flores.")


//LLAMADO DE LA FUNCION PARA INICIAR EL PROCESO DE INGRESO DE LA INFORMACION POR PARTE DEL USUARIO.
iniciarProceso()


//LLAMA A LA FUNCION PARA MOSTRAR EL MENSAJE DE RESUMEN.
mensajeResumen()



