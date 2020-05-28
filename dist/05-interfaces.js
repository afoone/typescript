var Persona2 = /** @class */ (function () {
    function Persona2(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    Persona2.prototype.velocidad = function () {
        return 5;
    };
    Persona2.prototype.setProfesion = function (profesion) {
        this.profesion = profesion;
        return this;
    };
    Persona2.prototype.getProfesion = function () {
        return this.profesion;
    };
    return Persona2;
}());
