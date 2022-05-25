// Damos la bienvenida
alert("Bienvenidos a tu calculadora")

do {
    let menu = menuPrincipal();
    let operacion = operaciones(menu);

} while (continuar() == 1);

// Menu calculadora
function menuPrincipal() {
    let opcion;

    do{
        opcion = parseInt(prompt(`Menu: \n 1- Sumar \n 2- Restar \n 3- Dividir \n 4- Multiplicar` ));
    } while (opcion != 1 && opcion != 2 && opcion != 3 && opcion != 4);

    if (opcion == 1) {return "Sumar";}
    if (opcion == 2) {return "Restar";}
    if (opcion == 3) {return "Dividir";}
    if (opcion == 4) {return "Multiplicar"}
} 

// Llamada de cada funcion
function operaciones(menu) {

    switch(menu){
        case "Sumar":
            sumar();
            break;
        case "Restar":
            restar();
            break;
        case "Dividir":
            dividir();
            break;
        case "Multiplicar":
            multiplicar();
            break;    
    }
}

// Sumar 
function sumar(){
    let num1 = Number((prompt("Ingrese el primer numero que quiera sumar")))
    let num2 = Number((prompt("Ingrese el segundo numero que quiera sumar")))
    let resultado = num1 + num2
    alert("El resultado es " + resultado)
}

// Restar
function restar(){
    let num1 = parseInt((prompt("Ingrese el primer numero que quiera restar")))
    let num2 = parseInt((prompt("Ingrese el segundo numero que quiera restar")))
    let resultado = num1 -  num2
    alert("El resultado es " + resultado)
}

// Dividir 
function dividir(){
    let num1 = Number((prompt("Ingrese el primer numero que quiera dividir")))
    let num2 = Number((prompt("Ingrese el segundo numero que quiera dividir")))
    let resultado = num1 / num2
    alert("El resultado es " + resultado)
}

// multiplicar 
function multiplicar(){
    let num1 = Number((prompt("Ingrese el primer numero que quiera multiplicar")))
    let num2 = Number((prompt("Ingrese el segundo numero que quiera multiplicar")))
    let resultado = num1 * num2
    alert("El resultado es " + resultado)
}

// Validacion
function continuar() {
    return (prompt('Quiere hacer otra accion? \n 1- Si \n 2- No'));
}