
# This en Javascript

Una de las características de JavaScript que más confusión genera es la palabra clave `this`. Más concretamente a qué o quién hace referencia y en qué circunstancias.

Para dejarlo claro desde el principio: `this`, de ninguna manera, es una referencia a una función. `this` tampoco permite acceder o hacer de puente entre ámbitos de diferentes funciones. No, nada de eso es this.

Pero entonces, ¿qué es?.

## ¿Que es this?

**`this` es una referencia que se crea cuando una función es invocada, no declarada**. **El valor de esa referencia depende al 100% del lugar en la que esa invocación se realice, llamado call-site**.

Ese lugar de llamada es la invocación en sí a la función. Es decir, el momento justo en que es llamada (no declarada, no referenciada) esa función.

Como estamos tratando con JavaScript, vamos a examinar los call-site a funciones en los escenarios más comunes.

#### `this` en el contexto global
Fuera de cualquier función, es decir, en el ámbito global, this siempre hace referencia al objeto global window:

```javascript
// Estamos en el contexto de ejecución global
console.log(this === window); // true
```


#### `this`en invocaciones de funciones

Dentro de una función, el valor de this está determinado por el lugar en el que esa función es invocada.

En una sencilla función declarada, this hace referencia al objeto global window:

```javascript
function funcion() {
    console.log(this);
}
funcion(); // window
```

Sin embargo, ese escenario cambia de forma drástica si utilizamos el modo estricto de JavaScript:

```javascript
"use strict";
function funcion() {
    console.log(this);
}
funcion(); // undefined
```

Esta distinción es vital si no queremos ensuciar el ámbito global accidentalmente. Por ejemplo, utilizando de forma errónea una llamada de construcción a una función.

```javascript
function Gato(raza, color) {
    this.raza = raza;
    this.color = color;
}
const nino = Gato('europeo', 'negro');
console.log(nino); // undefined
```

Como puedes comprobar, con sólo olvidar el operador new ya no estarás creando una nueva instancia de Gato bajo el objeto nino.

Lo que es peor: sin darte cuenta estarás añadiendo propiedades al objeto global window, ya que dentro de una función this hace siempre referencia al objeto global.

```javascript
/* Código anterior */
console.log(window.raza, window.color); // europeo negro
```

Basta con usar el modo estricto para evitar estos accidentes:

```javascript
"use strict"
/* Código anterior */
console.log(window.raza); // Uncaught TypeError: Cannot set property 'raza' of undefined
```

Este ejemplo me lleva al siguiente escenario de invocación o call-site: los constructores.

#### this en invocaciones de construcción
Como sabes, a diferencia de otros lenguajes, JavaScript no dispone de constructores como tal, sino de llamadas de construcción ”construction calls” a una función.

A través del operador new se crea un nuevo objeto, se asigna su prototipo a la función constructora y lo que es más importante: dentro de la función que hace de constructor, el valor de this hace referencia a ese nuevo objeto que se está creando.

Por eso, cuando una función es invocada como un constructor, gracias a ese valor específico de this podemos establecer los parámetros que recibe la función como propiedades del nuevo objeto:

```javascript
function Gato(raza, color) {
    this.raza = raza;
    this.color = color;
    console.log(this);
    // Gato {raza: "europeo", color: "negro"}
}
const guizmo = new Gato('europeo', 'negro');
```

Sigamos hablando de objetos. En concreto en lo que ocurre con el valor de this cuando invocamos una función que pertenece a un objeto.

#### `this` en llamadas a métodos
Cuando una función es llamada como un método de un objeto, su contexto de this se asocia al objeto que contiene el método.

```javascript
const rouco = {
    nombre: 'Rouco',
    especie: 'gato',
    saludar() {
        console.log('Miauuuuu (Hola me llamo ${this.nombre})');
        console.log(this === rouco);
    }
};
rouco.saludar(); 
// Miauuuuu (Hola me llamo Rouco) 
// true
```

Sin embargo es relativamente sencillo perder el contexto de this si por ejemplo guardamos el método en una función declarada para ejecutarla como tal y no como un método (con su referencia al objeto):

```javascript
const rouco = {
    /* Código anterior */
};
let saludar = rouco.saludar;
saludar(); // <— Este es el "call-site"
// Miauuuuu (Hola me llamo undefined) 
// false
```

Fíjate que aunque nos estamos refiriendo al método de un objeto, la llamada (call-site) ocurre bajo la forma de una función declarada en el ámbito global.

Otra forma muy común de perder la referencia de this al objeto que contiene el método es al pasarlo —el método— como un callback a otra función:


```javascript
function funcion() {
    console.log(this.lugar);
}
function ejecutar(funcion) {
    funcion(); // <— Este es el "call-site"
}
var objeto = {
    lugar: 'objeto',
    funcion: funcion,
};
var lugar = 'global';
ejecutar(objeto.funcion); // 'global'
```

El lugar donde se invoca la función es lo único importante. En los dos últimos casos se trata de una función declarada. Como ya sabes this, en ambos casos, hará referencia a window o undefined, dependiendo si estamos en modo estricto o no.

#### `this` en arrow functions
Las funciones flecha o «arrow functions» se comportan de una forma muy particular en lo que se refiere a this.

Cuando creamos una arrow function, su valor de this queda asociado permanentemente a al valor de this de su ámbito externo inmediato. window en el caso del ámbito global:

```javascript
const funcion = () => {
    console.log(this === window);
};
funcion(); // true
```

O, si se encuentra dentro un método, el valor de this del método que la contiene. Esto hace que utilizar arrow functions como callbacks sea mucho más sencillo. Considera este ejemplo:

```javascript
const contador = {
    cantidad: 0,
    incremetar() {
        setInterval(function() {
            console.log(++this.cantidad);
        }, 1000);
    }
};
contador.incremetar(); // NaN NaN NaN …
```

Aunque not a number (NaN) no es el resultado esperado, tiene sentido encontrarlo ya que dentro de setInterval() el valor de this, que dentro del método incrementar() hacía referencia al propio objeto contador, se ha perdido.

Estamos buscando la propiedad cantidad en el objeto global, window.cantidad en lugar de contador.cantidad.

Una solución muy común hasta la aparición de las funciones flecha es hacer una copia del valor de this para utilizarla en otros ámbitos:

```javascript
const contador = {
    cantidad: 0,
    incremetar() {
            const that = this; // <— Hacemos una copia de this
        setInterval(function() {
            console.log(++that.cantidad); // La usamos…
        }, 1000);
    }
};
contador.incremetar(); // 1 2 3 …
```


Funciona, pero es una solución sucia y requiere crear una variable que sólo se utiliza para no perder el contexto de this. Afortunadamente, como las arrow functions tienen su valor de this asociado al ámbito exterior, resolver el problema del contador es sencillo:

```javascript
const contador = {
    cantidad: 0,
    incremetar() {
        setInterval(() => {
            console.log(++this.cantidad);
        }, 1000);
    }
};
contador.incremetar(); // 1 2 3 …
```

Dentro de la función flecha el valor de this es el mismo que en el método incrementar, permitiendo entonces acceder a la propiedad cantidad sin problemas.

## ¿Qué hacer con this entonces?
Habiendo examinado las situaciones más comunes en las que invocar una función y que ocurre con el valor de this en cada una de ellas, en el próximo artículo veremos qué herramientas pone JavaScript a nuestra disposición para controlar e incluso forzar (hard binding) un valor de this determinado en cada una de nuestras llamadas a funciones.


Vems que en algunas circunstancias el valor de this cambia o, directamente, se pierde, examinando conceptos como default binding o implicit binding.

```javascript
// Default binding
function miFuncion() {
    console.log(this);
}
miFuncion(); // global object o undefined en strict-mode
// Implicit binding
function miFuncion() {
    console.log(this.a);
}
var objeto = {
    a: 'Hola mundo'
    miFuncion: miFuncion,
};
objeto.miFuncion(); // Hola mundo
```


Explicit binding
Ahora bien, ¿existe alguna forma de forzar a una función a que, cuando sea invocada, use un valor específico de this?. La respuesta es si, todas las funciones en JavaScript tienen acceso a los métodos nativos apply y call, respectivamente.

Al invocar la función ambas toman como parámetro el valor de this que deseamos, por eso se llama explicit binding. Aquí tienes un ejemplo:

function saludar() {
    console.log('Hola, me llamo ' + this.nombre)
}
var persona =  {
    nombre: 'Juan',
}
var nombre = 'Andrés';
saludar(); // "Hola, me llamo Andrés"
saludar.call(persona); // "Hola, me llamo Juan"
Como puedes ver, con call invocamos la función saludar forzando el objeto persona como valor de this.

Por si te estás preguntando qué diferencias hay entre call y apply: ninguna a efectos de this. Si que se comportan de forma diferente a la hora de recibir parámetros.

A pesar de que con call o apply podemos de alguna forma forzar el valor de this en la invocación de la función, esto no resuelve por si sólo el problema que vimos anteriormente (perder la referencia a this). Considera esto:

function saludar() {
    console.log('Hola, me llamo ' + this.nombre)
}
var persona =  {
    nombre: 'Juan',
    saludar: saludar,
}
function ejecutar(funcion) {
    // "Aquí perdemos la referencia a this, incluso con call"
    funcion(); 
}
var nombre = "Andrés";
ejecutar.call(persona, persona.saludar); // "Hola, me llamo Andrés"
La referencia se pierde ya que, como ya sabes, lo importante no es donde está definida la función, sino desde dónde se invoca (call-site). En este caso es una simple función declarada, por lo que el default binding toma el control.

Hard binding
Existe una variante del binding explícito que consigue unir de forma inalterable un contexto de this a la invocación de una función sin importar dónde se haga (call-site) esta:

function saludar() {
    console.log('Hola, me llamo ' + this.nombre);
}
var persona =  {
    nombre: 'Juan',
    saludar: saludar,
};
function unir() {
    saludar.call(persona);
}
var nombre = "Andrés";
unir(); // "Hola, me llamo Juan"
setTimeout(unir, 2000); // "Hola, me llamo Juan"
(function() {
    unir(); // "Hola, me llamo Juan"
})();
Como puedes comprobar, da igual desde qué lugar invoquemos la función, el valor de this ha quedado fuertemente unido a la función, de ahí que lo llamemos Hard Binding.

El uso del hard binding es tan común en JavaScript, que las funciones disponen de un método bind nativo. bind retorna una función lista para ser invocada y con su valor de this unido de forma indisoluble al contexto que indiquemos:

function saludar() {
    console.log('Hola, me llamo ' + this.nombre);
}
var persona =  {
    nombre: 'Juan',
};
var saludo = saludar.bind(persona);
saludo(); // "Hola, me llamo Juan"
Conclusión
Durante dos artículos hemos examinado los escenarios más comunes de invocación a funciones, revisando el valor de this en cada uno de ellos. Como ahora ya sabes, todo depende del lugar donde se realice esa invocación.

De esta forma, ya sea desde el ámbito global, a través de una llamada de construcción, como método de un objeto o utilizando los métodos bind, call y/o apply, el valor de this no volverá —espero— a sorprenderte.

