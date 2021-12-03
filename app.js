/*Como primer paso necesitarás requerir él módulo lecturaEscritura y asignarlo a una variable para poder utilizar sus funcionalidades, además de hacer la lectura del archivo departamentos.json, en detalle:
Requerir módulo lecturaEscritura y asignarlo a una variable llamada por ejemplo archivos, esta contendrá los métodos del módulo requerido de ahora en más
Leer él archivo departamentos.json utilizando la variable archivos creada anteriormente con él método adecuado y asignar a una variable llamada arrayDepartamentos
Comprobar los pasos anteriores imprimiendo la variable arrayDepartamentos. ejemplo : console.log(arrayDepartamentos) */

let archivos = require('./lecturaEscritura')

let arrayDepartamentos = archivos.leerJson("departamentos")
// console.log(arrayDepartamentos);

/*Crear un objeto literal, que podemos llamar inmobiliaria, será nuestra representación de la inmobiliaria (valga la redundancia) con su datos (propiedades) y sus funcionalidades (métodos). */
/* Agregar una propiedad llamada departamentos que contenga él arrayDepartamentos obtenido en el punto anterior. */
let inmobiliaria = {
    departamentos: arrayDepartamentos,
/*Agregar un método buscarPorId que permita buscar un departamento en función de su id.
Este método recibirá por parámetro un number que representa él id del departamento a buscar
En caso de encontrar un departamento con él id buscado, devolverá el objeto literal que lo representa.
En caso contrario devolverá undefinded*/
    buscarPorId: function(id){
        return this.departamentos.find(dept=> dept.id === id)
    },
/*Agregar un método departamentosNoDisponibles que permite filtrar departamentos cuando su propiedad disponible sea igual a false, esto quiere decir que están alquilados.
Este método devolverá un array con todos los departamentos que cumplan la condición mencionada
en caso de no encontrar ningún	 que cumpla con la condición, devolverá un array vacío*/
    departamentosNoDisponibles: function (){
        let alquilados = this.departamentos.filter(dept => dept.disponible === false);
        return alquilados;
    },
/*Agregar un método departamentosDisponibles que permite filtrar departamentos cuando su propiedad disponible sea igual a true.
Este método devolverá un array con todos los departamentos que cumplan la condición mencionada
en caso de no encontrar ningún	 que cumpla con la condición, devolverá un array vacío */
    departamentosDisponibles: function (){
        let disponibles = this.departamentos.filter(dept => dept.disponible === true);
        return disponibles;
    },
/*Agregar un método filtrarPorAmbientes que permite filtrar departamentos, siempre y cuando su propiedad ambientes sea mayor o igual a una cantidad enviada como argumento.
Este método recibirá por parámetro un number que represente la cantidad de  ambientes mínimo.
Este método devolverá un array con todos los departamentos que cumplan con la condición mencionada.
En caso de no encontrar ningún departamento que cumpla con la condición, devolverá un array vacío. */
    filtrarPorAmbientes: function(ambientes) {
        return this.departamentos.filter(depto => depto.ambientes >= ambientes);
    },
/*Agregar un método filtrarPorPrecio que permite filtrar departamentos, siempre y cuando su propiedad precioAlquiler sea menor o igual a él precio enviado como argumento.
Este método recibirá por parámetro un number que represente él precioAlquiler máximo.
Este método devolverá un array con todos los departamentos que cumplan con la condición mencionada.
En caso de no encontrar ningún departamento que cumpla con la condición, devolverá un array vacío.
Este método debe usar departamentosDisponibles, para buscar incluir solamente aquellos departamentos que estén disponibles. */
    filtrarPorPrecio: function(){
        let filtrados = this.departamentos();
        return filtrados.filter(dept=> dept.precioAlquiler <= precioAlquiler);
    },
/*Agregar un método rebajarPrecioAlquiler que modifique él valor de precioAlquiler de los departamentos No Alquilados.
Este método debe usar departamentosDisponibles, para buscar incluir solamente aquellos departamentos que estén disponibles, es decir, que no estén Alquilados.
Este método recibirá por parámetro un number que represente él porcentaje que se desea rebajar a los departamentos no alquilados por ejemplo un 3%.
Este método devolverá un array con todos los departamentos que sufrieron la modificación del precioAlquiler
Este método debe realizar una persistencia de información, para esto utilizaremos él método escribirJson de nuestro objeto requerido en él primero punto. */
    rebajarPrecioAlquiler: function(descuento) {
        let disponibles = this.departamentosDisponibles()
        disponibles.forEach((depto) => {
            depto.precioAlquiler -= depto.precioAlquiler * (descuento / 100)
        })
        archivos.escribirJson('departamentos', this.departamentos)
        return disponibles;
    },
/*Agregar un método calcularRecaudación que calcule él valor que se depositará en caja tomando en cuenta él precioAlquiler de los departamentos Alquilados.
Este método devolverá un valor que represente la recaudación total.
Este método debe usar departamentosNoDisponibles, para buscar incluir solamente aquellos departamentos que estén no disponibles, es decir, Alquilados. */
    calcularRecaudacion: function() {
        let alquilados = this.departamentosNoDisponibles();
        return alquilados.reduce((acc, alquilado) => acc + alquilado.precioAlquiler, 0)
    },
/*Agregar un método ordenarPorPrecio que ordene los departamentos de menor a mayor según su precio.
El método recibirá como parámetro un array de departamentos. 
Este método devolverá un array con todos los departamentos ordenados por precio.*/
    ordenarPorPrecio: function(arrayDepartamentos) {
        return arrayDepartamentos.sort((a, b) => a.precioAlquiler - b.precioAlquiler)
    }
}
