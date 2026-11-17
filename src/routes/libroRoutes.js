// Modularización de Rutas: Creamos este archivo para delegar la gestión de las peticiones-solicitudes-request
// utilizando el objeto Router de Express. Esto evita que app.js tenga demasiadas responsabilidades.

//Importo express para manejar las rutas con el metodo Routes (controlador de rutas)
import express from 'express';
// Importo la instancia de LibroController
import libroController from '../controllers/libroController.js';


// express.Router() crea un "mini-servidor" dedicado exclusivamente a gestionar rutas
const routes = express.Router();

//en lugar de usar app.get('/libros',); uso routes ( es el enrutador de express)
//Trae la ruta, luego el libroController (funcion de libroController) y finalmente llama a la listaLibros de la misma funcion para responder 

// Cuando llegue una petición GET a la ruta  '/libros', se ejecutará la función 'listaLibros' que viene del módulo libroController.js
//Consulta libros
routes.get('/libros', libroController.listaLibros);
//Crea libro
routes.post('/libros', libroController.creaLibro);

export default routes;

