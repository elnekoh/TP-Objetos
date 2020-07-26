"use strict";
exports.__esModule = true;
var ReadlineSync = require("./node_modules/readline-sync");
var Libro = /** @class */ (function () {
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
    //metodos
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
    };
    Libro.prototype.changeNombre = function () {
        var nuevoNombre = "";
        while (nuevoNombre == "") {
            nuevoNombre = ReadlineSync.question("cual sera el nombre del libro?: ");
        }
        this.nombre = nuevoNombre.toLowerCase();
    };
    return Libro;
}());
var GestorLibros = /** @class */ (function () {
    function GestorLibros() {
        this.libros = [];
    }
    //insertar/consultar/modificar/eliminar
    GestorLibros.prototype.createNewLibro = function () {
        var nombre = ReadlineSync.question("cual sera el nombre del libro?: ");
        var genero = ReadlineSync.question("cual sera el genero del libro?: ");
        nombre = nombre.toLowerCase();
        genero = genero.toLowerCase();
        var nuevoLibro = new Libro(nombre, genero);
        this.libros.push(nuevoLibro);
    };
    GestorLibros.prototype.getLibros = function () {
        console.log(this.libros);
    };
    GestorLibros.prototype.modificarLibro = function () {
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
        var libroAEliminar = this.searchLibro("eliminar: ");
        if (libroAEliminar != -1) {
            this.libros.splice(1, libroAEliminar);
        }
    };
    GestorLibros.prototype.searchLibro = function (texto) {
        var libroABuscar = 0;
        var nombreRecibido = ReadlineSync.question("porfavor ingrese el nombre del libro que desea " + texto);
        nombreRecibido = nombreRecibido.toLowerCase();
        var nombreLibro;
        //libroABuscar: esta variable es la ubicacion (en el arreglo) del libro que el usuario desea modificar.
        //nombreRecivido: es el nombre que el usuario nos dio, puede estar equivocado y el libro puede no existir
        while (this.libros[libroABuscar].getNombre() != nombreRecibido && libroABuscar < this.libros.length) {
            libroABuscar++;
        }
        nombreLibro = this.libros[libroABuscar].getNombre();
        if (nombreLibro == nombreRecibido) {
            return libroABuscar;
        }
        if (libroABuscar == this.libros.length) {
            console.log("No se encontro el libro");
            return -1;
        }
    };
    return GestorLibros;
}());
var gestor = new GestorLibros();
var opcion;
while (opcion != 0) {
    console.log("Seleccione una opcion porfavor");
    console.log("1: Añadir un nuevo libro.");
    console.log("2: Ver libros almacenados");
    console.log("3: Modificar un libro");
    console.log("4: Eliminar un libro");
    console.log("0: Salir");
    opcion = ReadlineSync.questionInt("");
    switch (opcion) {
        case 0: {
            console.log("babai.");
            break;
        }
        case 1: {
            gestor.createNewLibro();
            break;
        }
        case 2: {
            gestor.getLibros();
            break;
        }
        case 3: {
            gestor.modificarLibro();
            break;
        }
        case 4: {
            gestor.deleteLibro();
            break;
        }
        default:
            console.log("ese numero no era una opcion");
    }
}
