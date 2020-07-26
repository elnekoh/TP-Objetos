import * as ReadlineSync from './node_modules/readline-sync'


class Libro {
    private nombre: string;
    private genero: string;

    constructor(nombre:string, genero:string){
        if(nombre == undefined){
            this.nombre = "Sin nombre";
        }else{
            this.nombre = nombre;
        }
        if(genero == undefined){
            this.genero = "Sin genero";
        }else{
            this.genero = genero;
        }
    }

    //metodos
    public getNombre(): string{
        return this.nombre;
    }
    public getGenero(): string{
        return this.genero;
    } 

    public changeGenero(): void{
        let nuevoGenero: string = ReadlineSync.question("cual sera el genero del libro?: ");
        this.genero = nuevoGenero;
    }

    public changeNombre(): void{
        let nuevoNombre: string = ReadlineSync.question("cual sera el nombre del libro?: ");
        this.nombre = nuevoNombre;
    }
}

class GestorLibros{
    private libros: Libro[];

    constructor(){
        this.libros = [];
    }
    //insertar/consultar/modificar/eliminar
    public createNewLibro():void {
        let nombre:string = ReadlineSync.question("cual sera el nombre del libro?: ");
        let genero:string = ReadlineSync.question("cual sera el genero del libro?: ")
        let nuevoLibro = new Libro(nombre, genero);
        this.libros.push(nuevoLibro)
    }

    public getLibros():void {
        console.log(this.libros);
    }

    public modificarLibro():void{
        let opcion: string = "";
        let libroAModificar: number = this.searchLibro("modificar");
        if(libroAModificar != -1){
            while(opcion != "nombre" && opcion != "genero"){
                opcion= ReadlineSync.question("Desea modificar el nombre o el genero?: ");
                opcion= opcion.toLowerCase();
            }

            if(opcion == "nombre"){
                this.libros[libroAModificar].changeNombre();
            }else{
                this.libros[libroAModificar].changeGenero();
            }
        }
    }

    public deleteLibro(): void{
        let libroAEliminar: number = this.searchLibro("eliminar");
        if(libroAEliminar != -1){
            this.libros.splice(1,libroAEliminar);
        }
    }

    private searchLibro(texto:string): number{
        let libroABuscar: number = 0;
        let nombreRecibido: string = ReadlineSync.questionInt("porfavor ingrese el nombre del libro que desea "+texto);
        nombreRecibido = nombreRecibido.toLowerCase();
        let nombreLibro: string = this.libros[0].getNombre().toLowerCase();
        //libroABuscar: esta variable es la ubicacion (en el arreglo) del libro que el usuario desea modificar.
        //nombreRecivido: es el nombre que el usuario nos dio, puede estar equivocado y el libro puede no existir
        //nombreLibro: seran los libros de el arreglo
        while(nombreLibro != nombreRecibido && libroABuscar <this.libros.length){
            nombreLibro = this.libros[libroABuscar].getNombre();
            nombreLibro = nombreLibro.toLowerCase();
        }
        if(nombreLibro == nombreRecibido){
            return libroABuscar;
        }
        if(libroABuscar == this.libros.length){
            console.log("No se encontro el libro");
            return -1;
        }
    }
}