class Libro {
    genero: string;

    constructor(genero:string){
        this.genero = genero;
    }
}

class GestorLibros{
    libros: Libro[];

    constructor(){
        this.libros = [];
    }
    //insertar/consultar/modificar/eliminar
}