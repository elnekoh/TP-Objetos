# TP-Objetos
Este programa simula un gestor de libros, donde el usuaria cargara manualemente (especificando el nombre y genero de los mismos).
los libros que posea para tener un registro de ellos,
ademas de cargar los libros, puede modificarlos, borrarlos y puede pedirle al programa que imprima por consola un cuadro conceptual donde se pueden ver los generos, y los diferentes libros que esten asociados a cada genero (esto es posible gracias a la libreria "undirender").

#Undirender
esta libreria tiene la funcion de dibujar por pantalla un cuadro conceptual, donde asocia datos por medio de lineas.
se usa de la sigueinte manera; primero importamos la libreria 
(let undirender = require('undirender'))
luego declaramos una variable que guardara los datos que queremos que se grafiquen
( let grafico = undirender(80, 20, [
    [ 'a', 'b' ],
    [ 'a', 'e' ],
    [ 'b', 'c' ],
    [ 'b', 'd' ],
    [ 'c', 'e' ],
    [ 'd', 'e' ],
    [ 'd', 'g' ],
    [ 'g', 'h' ],
    [ 'h', 'e' ]
]))

donde el numero 80 es el ancho de el grafico, y el 20 es el alto (estos numeros podemos cambiarlos a nuestro gusto).
despues  de escribir los dos primeros datos (los cuales son usados para dimencionar el tamaño del cuadro), debemos darle un tercer elemento, que sera un arreglo, y dentro del arreglo se almacenaran arreglos de strings (2 strings por arreglo), en estos arreglos de strings escribiremos las uniones que seran dibujadas en consola (por ejemplo, a, se une con b, y con e, por que en el primer y segundo arreglo de strings estan emparejados);

y para mostrar el grafico en pantalla, tenemos que imprimir la variable con un console.log
(console.log(grafico))