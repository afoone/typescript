// Un decorador es un patrón de diseño que nos permite modificar una clase para 
// modificar su funcionamiento

function contratar(profesion:string) {
    return function(target:Function){
        target.prototype.contratar= ():void => {target.prototype.profesion="Informático"} 
    }
}


@contratar("Informático")
class Persona4 implements PersonaBase{


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
    public setProfesion(profesion:string):Persona4{
        this.profesion= profesion;
        return this;
    }

    public getProfesion():string{
        return this.profesion;
    }

}

const luisa = new Persona4("Luisa", 34);

console.log(luisa.getProfesion())


