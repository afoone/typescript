// Un decorador es un patrón de diseño que nos permite modificar una clase para 
// modificar su funcionamiento
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function contratar(profesion) {
    return function (target) {
        target.prototype.contratar = function () { target.prototype.profesion = "Informático"; };
    };
}
var Persona4 = /** @class */ (function () {
    function Persona4(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    Persona4.prototype.velocidad = function () {
        return 5;
    };
    Persona4.prototype.setProfesion = function (profesion) {
        this.profesion = profesion;
        return this;
    };
    Persona4.prototype.getProfesion = function () {
        return this.profesion;
    };
    Persona4 = __decorate([
        contratar("Informático")
    ], Persona4);
    return Persona4;
}());
var luisa = new Persona4("Luisa", 34);
console.log(luisa.getProfesion());
