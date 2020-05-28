interface PersonaBase {
    velocidad():number;
}


class Persona3 implements PersonaBase{


    // Visibilidad de la propiedad
    public edad: number;
    public nombre: string;
    private profesion: string;

    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
    }
    
    public velocidad():number {
        return 5;
    }
    public setProfesion(profesion:string):Persona3{
        this.profesion= profesion;
        return this;
    }

    public getProfesion():string{
        return this.profesion;
    }

}

class Empleado extends Persona3 {

    public sueldo : number;

    constructor(nombre:string, edad: number, sueldo: number) {
        super(nombre, edad);
        this.sueldo = sueldo;
    }
}

const juan: Empleado = new Empleado("Juan", 45, 30000);

console.log(juan.edad, juan.nombre, juan.sueldo);

