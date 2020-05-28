var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Persona3 = /** @class */ (function () {
    function Persona3(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    Persona3.prototype.velocidad = function () {
        return 5;
    };
    Persona3.prototype.setProfesion = function (profesion) {
        this.profesion = profesion;
        return this;
    };
    Persona3.prototype.getProfesion = function () {
        return this.profesion;
    };
    return Persona3;
}());
var Empleado = /** @class */ (function (_super) {
    __extends(Empleado, _super);
    function Empleado(nombre, edad, sueldo) {
        var _this = _super.call(this, nombre, edad) || this;
        _this.sueldo = sueldo;
        return _this;
    }
    return Empleado;
}(Persona3));
var juan = new Empleado("Juan", 45, 30000);
console.log(juan.edad, juan.nombre, juan.sueldo);
