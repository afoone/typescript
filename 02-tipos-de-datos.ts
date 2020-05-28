// string
let c: string =  "hola";
console.log(c)

//cadena= 5;

// number
let numero: number = 6;


//boolean

let b: boolean = true;


// any
let cualquiera: any = ["hola"]


// arrays

let arr : Array<string> = ["hola", "adios"]

//arr.push(1)

// forma equivalente de definición de arrays
let years: number[] = [6,7,8]


// multiples tipos de datos asignados a una variable

let cadena1: string|number = 4;
cadena1 = "cuatro"

console.log(c, numero, b, cualquiera, arr, years)


// tiposde datos personalizados
type alfanumerico = string | number;
let varAlfa: alfanumerico = 5;


// let vs var
// la diferencia es el scope, el de let es a nivel de bloque y var global

var numero1: number= 10;
var numero2: number = 12;


if (numero1===10) {
    let numero1 = 44;
    var numero2 = 55;
    console.log(numero1, numero2)
}
console.log(numero1, numero2)







