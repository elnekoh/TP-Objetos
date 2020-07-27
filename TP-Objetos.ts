import * as ReadlineSync from './node_modules/readline-sync'
import * as Undirender from './node_modules/undirender'


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
        let nuevoGenero: string = ""
        while(nuevoGenero == "" ){
            nuevoGenero = ReadlineSync.question("cual sera el genero del libro?: ");
        }
        this.genero = nuevoGenero.toLowerCase();
        imprimirLinea("Genero cambiado!");
    }

    public changeNombre(): void{
        let nuevoNombre: string = "";
        while(nuevoNombre == ""){
            nuevoNombre = ReadlineSync.question("cual sera el nombre del libro?: ");
        }
        this.nombre = nuevoNombre.toLowerCase();
        imprimirLinea("Nombre cambiado!")
    }
}

class GestorLibros{
    private libros: Libro[];

    constructor(){
        this.libros = [];
    }


    public graficar():void{
        let arregloGrafico:any[] = [];
        let numeroLibros:number = this.libros.length;
        for(let i:number=0;i<numeroLibros;i++){
            arregloGrafico[i] = [this.libros[i].getNombre(), this.libros[i].getGenero()];
        }
        let grafico = Undirender(80,20,arregloGrafico);
        imprimirLinea(grafico);
    }
    //insertar/consultar/modificar/eliminar
    public createNewLibro():void {
        let nombre:string = ReadlineSync.question("cual sera el nombre del libro?: ");
        let genero:string = ReadlineSync.question("cual sera el genero del libro?: ");
        nombre = nombre.toLowerCase();
        genero = genero.toLowerCase();
        let nuevoLibro = new Libro(nombre, genero);
        this.libros.push(nuevoLibro)
        imprimirLinea("Libro creado!");
    }

    public getLibros():void {
        console.log(this.libros);
    }

    public modificarLibro():void{
        let opcion: string = "";
        let libroAModificar: number = this.searchLibro("modificar: ");
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
        let libroAEliminar: number = this.searchLibro("eliminar: ");
        if(libroAEliminar != -1){
            this.libros.splice(1,libroAEliminar);
        }
    }

    private searchLibro(texto:string): number{
        let libroABuscar: number = 0;
        let cantLibros: number = this.libros.length;
        let nombreRecibido: string = ReadlineSync.question("porfavor ingrese el nombre del libro que desea "+texto);
        nombreRecibido = nombreRecibido.toLowerCase();
        let nombreLibro: string;
        //libroABuscar: esta variable es la ubicacion (en el arreglo) del libro que el usuario desea modificar.
        //nombreRecivido: es el nombre que el usuario nos dio, puede estar equivocado y el libro puede no exista.
        for(libroABuscar;libroABuscar<cantLibros;libroABuscar++){
            if(this.libros[libroABuscar].getNombre() == nombreRecibido){
                nombreLibro=this.libros[libroABuscar].getNombre()
                break
            }
        }
        if(nombreLibro == nombreRecibido){
            return libroABuscar;
        }
        if(libroABuscar == this.libros.length){
            imprimirLinea("No se encontro el libro");
            return -1;
        }
    }
}

let imprimirLinea = (texto:string):void =>{
    let linea:string ="";
    if (texto == undefined){
        texto ="";
    }
    for(let i:number =0;i<41;i++){
        linea+="=";
    } 
    console.clear();
    console.log(linea);
    console.log("");
    console.log(texto);
    console.log("");
    console.log(linea);
    console.log("");
}

console.log("Hola!, como te llamas? ");
let usuario:string = ReadlineSync.question("(ingrese su nombre) >");
let gestor = new GestorLibros();
let opcion:number
while(opcion != 0){
    console.log(usuario+ ", seleccione una opcion porfavor");
    console.log("1: Añadir un nuevo libro.");
    console.log("2: Ver libros almacenados");
    console.log("3: Modificar un libro");
    console.log("4: Eliminar un libro");
    console.log("5: Graficar libros.");
    console.log("0: Salir");
    opcion = ReadlineSync.questionInt("");
    switch (opcion) {
        case 0: {
            imprimirLinea("Nos vemos! "+usuario);
            break;
        }
        case 1:{
            imprimirLinea(">Añadir nuevo libro.");
            gestor.createNewLibro();
            break;
        }
        case 2:{
            imprimirLinea(usuario+" estos son los libros almacenados");
            gestor.getLibros();
            break;
        }
        case 3:{
            imprimirLinea(">Modificar libro");
            gestor.modificarLibro();
            break;
        }
        case 4:{
            imprimirLinea(">Eliminar libro");
            gestor.deleteLibro();
            break;
        }
        case 5:{
            imprimirLinea(">Graficar libros");
            gestor.graficar();
            break
        }
        default:{
            imprimirLinea("ese numero no era una opcion");
        }
    }
}