class Persona {


    // Visibilidad de la propiedad
    public edad: number;
    public nombre: string;
    private profesion: string;

    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
    }

    public setProfesion(profesion:string):Persona{
        this.profesion= profesion;
        return this;
    }

    public getProfesion():string{
        return this.profesion;
    }

}


let pepe: Persona = new Persona("Pepe", 24);

console.log(pepe.nombre, pepe.edad);

pepe.edad = pepe.edad + 1;


console.log(pepe.nombre, pepe.edad);

// public: publica
// private: privada, solo desde la clase no herencia
// protected: desde la clase y sus heredadas

pepe.setProfesion("programador");
console.log(pepe.getProfesion())