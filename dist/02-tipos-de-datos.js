// string
var c = "hola";
console.log(c);
//cadena= 5;
// number
var numero = 6;
//boolean
var b = true;
// any
var cualquiera = ["hola"];
// arrays
var arr = ["hola", "adios"];
//arr.push(1)
// forma equivalente de definición de arrays
var years = [6, 7, 8];
// multiples tipos de datos asignados a una variable
var cadena1 = 4;
cadena1 = "cuatro";
console.log(c, numero, b, cualquiera, arr, years);
var varAlfa = 5;
// let vs var
// la diferencia es el scope, el de let es a nivel de bloque y var global
var numero1 = 10;
var numero2 = 12;
if (numero1 === 10) {
    var numero1_1 = 44;
    var numero2 = 55;
    console.log(numero1_1, numero2);
}
console.log(numero1, numero2);
