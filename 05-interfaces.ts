interface PersonaBase {
    velocidad():number;
}


class Persona2 implements PersonaBase{


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
    public setProfesion(profesion:string):Persona2{
        this.profesion= profesion;
        return this;
    }

    public getProfesion():string{
        return this.profesion;
    }

}

