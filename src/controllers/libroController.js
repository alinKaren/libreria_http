/** Creación de Controllers **/
// Definimos la clase LibroController, que actúa como responsable de todas las acciones (CRUD) sobre el modelo de libros.


// Importando el modelo 'libroModel' para ser utilizado en el controlador.
import libroModel from './models/libros.js';


// Una clase sirve como una "plantilla" o "molde" para crear objetos.
class libroController {



// Función listaLibros (READ-LECTURA) Las rutas (ej. app.get('/libros')) se trabajan por separado en 'libroRoutes.js'.
async listaLibros (req, res) {
    try{
    const listaLibros = await libroModel.find({  });
    res.status(200).json(listaLibros);
}catch (error){
    // Manejo de error en caso de que falle la consulta a la base de datos
    res.status(500).json({ mensaje: "Error al obtener la lista de libros", detalle: error.message });
}
}


// 4.-  POST  (CREAR UN LIBRO):app.post
async creaLibro (req,res) {
    try {
        const nuevoLibro = await libroModel.create(req.body);
         res.status(201).json({ mensaje: 'Libro registrado correctamente...', libro: nuevoLibro  });
    }catch (error) {
    res.status(400).json({ mensaje: "Error al guardar el libro", detalle: error.message });
    }
    }


    }
//exportamos una instancia (plano para crear objeto) de la calse libroController
export default libroController = new libroController();