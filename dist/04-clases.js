var Persona = /** @class */ (function () {
    function Persona(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    Persona.prototype.setProfesion = function (profesion) {
        this.profesion = profesion;
        return this;
    };
    Persona.prototype.getProfesion = function () {
        return this.profesion;
    };
    return Persona;
}());
var pepe = new Persona("Pepe", 24);
console.log(pepe.nombre, pepe.edad);
pepe.edad = pepe.edad + 1;
console.log(pepe.nombre, pepe.edad);
// public: publica
// private: privada, solo desde la clase no herencia
// protected: desde la clase y sus heredadas
pepe.setProfesion("programador");
console.log(pepe.getProfesion());
