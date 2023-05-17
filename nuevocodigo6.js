/* Creo que me aleje mucho de la consigna de arreglar un código recibido, en esta ocasión fue mas fácil e instructivo ir creando un codigo nuevo sobre el dado, no es lo óptimo, lo sé pero mi idea era asegurarme de aprender lo visto.
uno de mis mayores desafios (y por ello verá al pie del doc la función clienteActuando) es trabajar en consola sin ver resultados o ingresos, es decir: la interacción e implementación de JavaScript con el entorno cliente u otra aplicación... seguro que es cuestión de costumbre.
Bueno Profe, le dejo mi tarea, hay errores aun pero no quiero demorarme mas, además quiero ir a ver la solución que ud. subió ayer. Saludos muy cordiales!! */

// Cada producto del super es creado con esta clase 
class Producto {
    constructor(sku, nombre, precio, categoria, stock) {
        this.sku = sku;             // Identificador único del producto
        this.nombre = nombre;       // Su nombre
        this.precio = precio;       // Su precio
        this.categoria = categoria; // Categoría a la que pertenece este producto
    if (stock) {                    // pregunto si definen stock
        this.stock = stock;         // Cantidad disponible en stock
        } else {                    // Si no definen stock, pongo 10 por default
        this.stock = 10;            // Cantidad disponible en stock
        }
    }
}

// Creo todos los productos que vende el super
const queso = new Producto('KS944RUR', 'Queso', 10, 'lacteos', 4);
const gaseosa = new Producto('FN312PPE', 'Gaseosa', 5, 'bebidas');
const cerveza = new Producto('PV332MJ', 'Cerveza', 20, 'bebidas');
const arroz = new Producto('XX92LKI', 'Arroz', 7, 'alimentos', 20);
const fideos = new Producto('UI999TY', 'Fideos', 5, 'alimentos');
const lavandina = new Producto('RT324GD', 'Lavandina', 9, 'limpieza');
const shampoo = new Producto('OL883YE', 'Shampoo', 3, 'higiene', 50);
const jabon = new Producto('WE328NJ', 'Jabon', 4, 'higiene', 3);

// y genero un listado de productos que simula Bd
const productosDelSuper = [queso, gaseosa, cerveza, arroz, fideos, lavandina, shampoo, jabon];

//muestro listado con los productos del super
console.log("%c Productos del Super: ", "background-color:lightpink");
for (let i = 0; i < productosDelSuper.length; i++){
console.log(" * " + productosDelSuper[i].nombre + " - " + productosDelSuper[i].sku);
}/* y no, no tuve que reiniciar la pc al poner = en lugar de <, bueno, si. Pero de todo se aprende :) y tuve que leer mucho para comprender el porqué de productosDelSuper[i].nombre y no como yo lo ponía y no me resultaba: productosDelSuper.nombre[i] jeje*/
console.log("%c Agregue al carrito productos según su código", "color:blue; background-color:lightgreen")
// muestro carrito nuevo vacio (detalle solo separar donde comienza la accion)
console.log("%c Mostrando carrito nuevo:", "color:black; background-color:yellow")
console.log(`%c Precio total = 0 pesos; Productos en carrito = ninguno; Categorias en carrito = ninguna`, `color:blue; background-color:yellow`);

/* --IMPORTANTE-- Los datos se ingresan por PROMPT en consola*/

/*Declaro función que busca producto por su sku en lista Bd (la subí de posición para entender mejor el orden de lo que hago)*/
function findProductBySku(sku) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const prodEnc = productosDelSuper.find(prodBusc => prodBusc.sku === sku);
            if (prodEnc) {
                resolve(prodEnc);
            } else {
                reject(`Producto ${sku} no encontrado`);
            }
        }, 500);//bajo el tiempo de espera (la ansiedad me mata)
    });
}   

// Cada cliente que venga a mi super va a crear un carrito de esta clase
class Carrito {                 
    constructor() {             // Al crear un carrito, empieza vacio
        this.precioTotal = 0;   // Lo que pagará al finalizar la compra
        this.productos = [];    // Lista de productos agregados
        this.categorias = [];   // Lista de diferentes categorías de los productos en carrito
    }
    
    /*Declaro función que busca producto por su sku en carrito y en BD y agrega producto*/
    /*Si, me complique demasiado con esta función pero quería cubrir todas las posibilidades de malos ingresos o errores y aunque hay cosas de mas se entiende que hace*/
    async agregarAlCarrito(sku, cantidad) {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
            const productoEnCarrito = this.productos.find(producto => producto.sku === sku);
            if (productoEnCarrito) {
                productoEnCarrito.cantidad += cantidad;
                console.log(`Se agregaron ${cantidad} unidades de ${productoEnCarrito.nombre}`);
                console.log(`Ya había en carrito ${productoEnCarrito.nombre}, total actual: ${productoEnCarrito.cantidad}`);
                resolve();
            } else {
                const productoEnBD = productosDelSuper.find(producto => producto.sku === sku);
                if (productoEnBD) {
                    const productoNuevo = {//agrego todo porque aun no se cual usare a futuro
                        sku: productoEnBD.sku,
                        nombre: productoEnBD.nombre,
                        cantidad: cantidad,
                        precio: productoEnBD.precio,
                        categoria: productoEnBD.categoria
                    };
                    this.productos.push(productoNuevo);
                    console.log(`Se agregaron ${cantidad} unidades de ${productoNuevo.nombre}`);
                    resolve();
                } else {
                    reject(`Producto ${sku} no encontrado en la base de datos`);
                }
            }
            }, 300);
        });
    }

     //Creo función eliminar productos por sku en Carrito
     /*Simple elegante y mas facil de hacer sin then (creo que el async no va con then pero como funciona no lo toco jaja) quise copiar la funcion anterior de agregar, que esa si me llevó mucho tiempo, y despues modificarla pero se complicaba mucho por el then */
     async eliminarProducto(sku, cantidad) {
        const productoEnBD = await productosDelSuper.find(producto => producto.sku === sku);
        if (productoEnBD === undefined) {
            return { error: `El producto ${sku} no existe en la base de datos` };
        }
        let productoEnCarrito;
        return new Promise((resolve, reject) => {
            productoEnCarrito = this.productos.find(producto => producto.sku === sku);
            if (productoEnCarrito === undefined) {
                reject(new Error(`No hay producto ${sku} en el carrito`));
            } else {
                this.productos = this.productos.filter(producto => producto.sku !== sku);/*uso filter negado, una genialidad (aprendida en video 4 de apoyo que sacaba todos los números positivos) pero negarlo fué mi idea jaja*/
                this.categorias = this.categorias.filter(categoria => categoria != productoEnBD.categoria);
                resolve(`Ya no hay ${productoEnBD.nombre} en el carrito`);
            }
        })
        .then(mensaje => {
            if (cantidad > productoEnCarrito.cantidad) {
                let dif = cantidad - productoEnCarrito.cantidad
                throw new Error(`Se quitaron ${productoEnCarrito.cantidad} ${productoEnBD.nombre} del carrito, no se puede quitar ${dif} mas porque no hay en el carrito`);
            } else {
                if (cantidad === productoEnCarrito.cantidad) {
                    return (`Se han quitado todas las unidades de ${productoEnBD.nombre} del carrito`);
                } else {/*Hay un error aqui, ya que al quitar determinada cantidad de algun producto los quita a todos, talvez se pueda arreglar agregando un find al producto especifico a eliminar*/
                productoEnCarrito.cantidad -= cantidad;
                return `Se han quitado ${cantidad} unidades de ${productoEnBD.nombre} del carrito`;
                }
            }
        })
        .then(mensaje => {
          console.log(mensaje);
        })
        .catch(error => {
          console.log(error.message);
        });
    }
}

// Cada producto agregado al carrito es creado en esta clase
class ProductoEnCarrito {           
    constructor(sku, nombre, cantidad) {
        this.sku = sku;             // Identificador único del producto
        this.nombre = nombre;       // Su nombre
        this.cantidad = cantidad;   // Cantidad de este producto en el carrito
    }
}

    const carrito = new Carrito(); // Nuevo cliente, nuevo carrito
    const verProdEnCar = new ProductoEnCarrito();// Carrito final

// Función para mostrar el carrito con compras
async function mostrarCarritoIntermedio() {
    Producto = await this.findProductBySku(sku);
    console.log("%c Mostrando carrito con compras:", "color:white; background-color:blue")
    console.log("Productos en carrito:")
    let precioTotal = 0;
    for (let i = 0; i < carrito.productos.length; i++) {
        const producto = carrito.productos[i];
        console.log(`${carrito.productos[i].cantidad} ${carrito.productos[i].nombre} ${carrito.productos[i].sku} ${carrito.productos[i].precio}`);
        precioTotal += producto.cantidad * producto.precio;
    }
    carrito.precioTotal = precioTotal;
    console.log("Precio total = " + carrito.precioTotal + " pesos");
    clienteActuando();
}

// Función para mostrar el carrito final
async function mostrarCarritoFinal() {
    Producto = await this.findProductBySku(sku);//
    console.log("%c Mostrando carrito final:", "color:white; background-color:red")
    console.log("Productos en carrito:")
    let precioTotal = 0;
    for (let i = 0; i < carrito.productos.length; i++) {
        const producto = carrito.productos[i];
        console.log(`${carrito.productos[i].cantidad} ${carrito.productos[i].nombre} ${carrito.productos[i].sku}`);
        precioTotal += producto.cantidad * producto.precio;
    }
    carrito.precioTotal = precioTotal;
    console.log("Precio total = " + carrito.precioTotal + " pesos");
    alert("Para reiniciar el ejercicio, actualice la pagina por favor.");
}

// Creo funcion para interactuar con cliente
// Y esto es lo más tiempo me llevó y no es parte de la tarea jaja
async function clienteActuando (){
    let accion = prompt("Elija lo que desea hacer: C para comprar - E para quitar productos - V para ver el carrito - S para terminar")
    accion = accion.toUpperCase()// Otra genialidad
    if (accion !== "C" && accion !== "E" && accion !== "V" && accion !== "S"){/* Y aqui una burrada primero use || jaja me daba cualquiera */
        return clienteActuando();
    } else { 
        if (accion == "C"){// Para agregar productos al carrito
            sku = prompt("Ingrese el código del producto");
            cantidad = prompt("Ingrese la catidad de productos a agregar");
            cantidad = parseInt(cantidad);
            if (cantidad <=0){
                alert("Para agregar un producto ingrese un número mayor a cero. O use la función elimanarProducto para quitar productos del carrito");
            }
            carrito.agregarAlCarrito(sku, cantidad);// Agregando al carrito nuevo
            clienteActuando();
        } else {
            if (accion == "E"){// Para quitar productos al carrito
                sku = prompt("Ingrese el código del producto a quitar del carrito");
                cantidad = prompt("Ingrese la catidad de productos a quitar");
                cantidad = parseInt(cantidad);
                if (cantidad <=0){
                    alert("Ingrese un número positivo");
                }
                await carrito.eliminarProducto(sku, cantidad);// Eliminando del carrito /* Me olvide de poner el sku y perdí muchísimo, pero de verdad mucho, tiempo buscando el error en la funcion eliminarProducto y el error estaba aquí, grrr*/
                clienteActuando();
            } else {
                if (accion == "V") {// Función para mostar carrito con compras
                    mostrarCarritoIntermedio();
                } else {// Función para mostar carrito final
                    mostrarCarritoFinal();
                }
            }
        }
    }
}
clienteActuando();


/* Bueno, lo dejo así. He aprendido mucho y estoy contento con eso pero ya es muy tarde y además ya me demore mucho mas de lo que te había avisado. Perdón por ello y por todos los comentarios pero las noches son largas y silenciosas jaja algo hay que hacer para no dormirse. Saludos*/