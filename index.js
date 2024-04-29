//VARIABLES GLOBALES.
let nombreUsuario=""
let cantidadNotas=0
let notas=0.0
let notasAcumuladas = 0.0
let notaFinal = 0.0


//OBTIENE EL NOMBRE DEL ESTUDIANTE
let IngreseNombreUsuario=()=>{
    do {
        nombreUsuario = prompt("Ingrese el nombre del estudiante:")
      } while (nombreUsuario==="");
    return nombreUsuario
}


//OBTIENE CUANTAS NOTAS O CALIFICACIONES QUIERE INGRESAR EL USUARIO.
function IngresoCantidadNotas(){
    do {
        cantidadNotas= parseInt(prompt("Ingrese la cantidad de calificaciones a digitar:"))
      } while (cantidadNotas===0);

      const validar=confirm("Desea ingresar la cantidad de "+cantidadNotas+" calificaciones para el/la estudiante "+nombreUsuario+"?")
      if(validar==false){
        IngresoCantidadNotas()
      }
      return cantidadNotas
}


//EN BASE A LA CANTIDAD DE NOTAS INGRESADAS, LE SOLICITA CADA UNA DE LAS NOTAS AL USUARIO.
function CalculoPromedio(){
    notasAcumuladas = 0.0
    notaFinal = 0.0
    for(let i=1;i<=cantidadNotas;i++){
        notas= parseFloat(prompt("Ingrese la calificación de la nota "+i+"/"+cantidadNotas))
        while (notas<0 || notas>100 ){
            alert("El valor ingresado:"+ notas+ " es incorrecto. \n Debe ingresar calificaciones entre 0 y 100. Ingrese nuevamente el valor correcto.")
            notas= parseFloat(prompt("Ingrese la calificacion de la nota "+i+"/"+cantidadNotas))
        }
        notasAcumuladas=notasAcumuladas+notas
        }
        notaFinal=notasAcumuladas/cantidadNotas
        return notaFinal
    }


//EN BASE AL PROMEDIO OBTENIDO, GENERA UNA OBSERVACION    
function observacion(){
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


//FINALMENTE GENERA UN ALERT DONDE MUESTRA EL PROMEDIO Y LA NOTA OBTENIDA DEL ESTUDIANTE.
function ImprimirMensaje(){
    alert("La calificación final (Promedio) para el/la estudiante "+nombreUsuario+" es de "+ notaFinal.toFixed(2) +"% Por lo que su nivel es: " + observacion())
}


//FUNCION QUE INICIA EL PROCESO DE INGRESO DE INFORMACION.
function IniciarProceso(){
    let continuar=false
    do {
        IngreseNombreUsuario()
        IngresoCantidadNotas()
        CalculoPromedio()
        ImprimirMensaje()
        continuar=confirm("Desea ingresar informacion de otro estudiante?")
        } while (continuar===true);
    }


//LLAMADO DE LA FUNCION PARA INICIAR EL PROCESO DE INGRESO DE LA INFORMACION POR PARTE DEL USUARIO.
IniciarProceso()
