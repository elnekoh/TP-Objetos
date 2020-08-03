"use strict";
exports.__esModule = true;
var ReadlineSync = require("./node_modules/readline-sync");
var Undirender = require("./node_modules/undirender");
var Libro = /** @class */ (function () {
    //metodos
    function Libro(nombre, genero) {
        if (nombre == undefined) {
            this.nombre = "Sin nombre";
        }
        else {
            this.nombre = nombre;
        }
        if (genero == undefined) {
            this.genero = "Sin genero";
        }
        else {
            this.genero = genero;
        }
    }
    Libro.prototype.getNombre = function () {
        return this.nombre;
    };
    Libro.prototype.getGenero = function () {
        return this.genero;
    };
    Libro.prototype.changeGenero = function () {
        var nuevoGenero = "";
        while (nuevoGenero == "") {
            nuevoGenero = ReadlineSync.question("cual sera el genero del libro?: ");
        }
        this.genero = nuevoGenero.toLowerCase();
        imprimirLinea("Genero cambiado!");
    };
    Libro.prototype.changeNombre = function () {
        var nuevoNombre = "";
        while (nuevoNombre == "") {
            nuevoNombre = ReadlineSync.question("cual sera el nombre del libro?: ");
        }
        this.nombre = nuevoNombre.toLowerCase();
        imprimirLinea("Nombre cambiado!");
    };
    return Libro;
}());
var GestorLibros = /** @class */ (function () {
    //metodos
    function GestorLibros() {
        this.libros = [];
    }
    GestorLibros.prototype.graficar = function () {
        var arregloGrafico = [];
        var numeroLibros = this.libros.length;
        for (var i = 0; i < numeroLibros; i++) {
            arregloGrafico[i] = [this.libros[i].getNombre(), this.libros[i].getGenero()];
        }
        var grafico = Undirender(80, 20, arregloGrafico);
        imprimirLinea(grafico);
    };
    //insertar/consultar/modificar/eliminar
    GestorLibros.prototype.createNewLibro = function () {
        var nombre = ReadlineSync.question("cual sera el nombre del libro?: ");
        var genero = ReadlineSync.question("cual sera el genero del libro?: ");
        nombre = nombre.toLowerCase();
        genero = genero.toLowerCase();
        var nuevoLibro = new Libro(nombre, genero);
        this.libros.push(nuevoLibro);
        imprimirLinea("Libro creado!");
    };
    GestorLibros.prototype.getLibros = function () {
        for (var i = 1; i <= this.libros.length; i++) {
            console.log(i + ": Nombre: " + this.libros[i - 1].getNombre() + ", Genero: " + this.libros[i - 1].getGenero());
        }
    };
    GestorLibros.prototype.modificarLibro = function () {
        this.getLibros();
        var opcion = "";
        var libroAModificar = this.searchLibro("modificar: ");
        if (libroAModificar != -1) {
            while (opcion != "nombre" && opcion != "genero") {
                opcion = ReadlineSync.question("Desea modificar el nombre o el genero?: ");
                opcion = opcion.toLowerCase();
            }
            if (opcion == "nombre") {
                this.libros[libroAModificar].changeNombre();
            }
            else {
                this.libros[libroAModificar].changeGenero();
            }
        }
    };
    GestorLibros.prototype.deleteLibro = function () {
        this.getLibros();
        var libroAEliminar = this.searchLibro("eliminar: ");
        if (libroAEliminar != -1) {
            this.libros.splice(1, libroAEliminar);
            imprimirLinea("Libro eliminado!!");
        }
    };
    GestorLibros.prototype.searchLibro = function (texto) {
        var libroABuscar = 0;
        var cantLibros = this.libros.length;
        var nombreRecibido = ReadlineSync.question("porfavor ingrese el nombre del libro que desea " + texto);
        nombreRecibido = nombreRecibido.toLowerCase();
        var nombreLibro;
        //libroABuscar: esta variable es la ubicacion (en el arreglo) del libro que el usuario desea modificar.
        //nombreRecivido: es el nombre que el usuario nos dio, puede estar equivocado y el libro puede no exista.
        for (libroABuscar; libroABuscar < cantLibros; libroABuscar++) {
            if (this.libros[libroABuscar].getNombre() == nombreRecibido) {
                nombreLibro = this.libros[libroABuscar].getNombre();
                break;
            }
        }
        if (nombreLibro == nombreRecibido) {
            return libroABuscar;
        }
        if (libroABuscar == this.libros.length) {
            imprimirLinea("No se encontro el libro");
            return -1;
        }
    };
    return GestorLibros;
}());
var imprimirLinea = function (texto) {
    var linea = "";
    if (texto == undefined) {
        texto = "";
    }
    for (var i = 0; i < 41; i++) {
        linea += "=";
    }
    console.clear();
    console.log(linea);
    console.log("");
    console.log(texto);
    console.log("");
    console.log(linea);
    console.log("");
};
//aca empieza el programa
console.log("Hola!, como te llamas? ");
var usuario = ReadlineSync.question("(ingrese su nombre) >");
var gestor = new GestorLibros();
var opcion;
while (opcion != 0) {
    for (var i = 0; i <= 3; i++) {
        console.log("");
    }
    console.log(usuario + ", seleccione una opcion porfavor");
    console.log("1: Añadir un nuevo libro.");
    console.log("2: Ver libros almacenados");
    console.log("3: Modificar un libro");
    console.log("4: Eliminar un libro");
    console.log("5: Graficar libros.");
    console.log("0: Salir");
    opcion = ReadlineSync.questionInt("");
    switch (opcion) {
        case 0: {
            imprimirLinea("Nos vemos! " + usuario);
            break;
        }
        case 1: {
            imprimirLinea(">Añadir nuevo libro.");
            gestor.createNewLibro();
            break;
        }
        case 2: {
            imprimirLinea(usuario + " estos son los libros almacenados");
            gestor.getLibros();
            break;
        }
        case 3: {
            imprimirLinea(">Modificar libro");
            gestor.modificarLibro();
            break;
        }
        case 4: {
            imprimirLinea(">Eliminar libro");
            gestor.deleteLibro();
            break;
        }
        case 5: {
            imprimirLinea(">Graficar libros");
            gestor.graficar();
            break;
        }
        default: {
            imprimirLinea("ese numero no era una opcion");
        }
    }
}
