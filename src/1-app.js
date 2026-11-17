/**
 * ============================================================================
 * CREACIÓN Y GESTIÓN DE SERVIDOR HTTP CON EXPRESS
 * ============================================================================
 *
 * Express: Framework de Node.js diseñado para crear servidores web y APIs
 * de forma rápida y ordenada. Nos proporciona una arquitectura base y 
 * herramientas para gestionar rutas y peticiones.
 *
 * --- SERVIDOR DE APLICACIONES PARA API REST ---
 * Este servidor tiene la capacidad de:
 * 1. Recibir solicitudes (requests) del cliente.
 * 2. Ejecutar lógica de negocio.
 * 3. Interactuar con la base de datos (MongoDB).
 * 4. Procesar y enviar una respuesta (response).
 *
 * Nota: Aunque generalmente respondemos en formato JSON, una API REST puede 
 * servir datos en XML, HTML, YAML o archivos binarios (imágenes, documentos) 
 * dependiendo de la cabecera 'Content-Type'.
 */


// Importa el framework Express para la creación y gestión del servidor HTTP, importamos express en nuestra app del paquete express
import express from "express";
// Importa la función encargada de establecer la conexión con MongoDB
import conectarBaseDatos from "./3-config/conexionDB.js";
// Importa el modelo de datos (esquema) para interactuar con la colección de libros
import libroModel from "./moodels/libros.js";



// Crea una instancia (plano) pricipal de Express denominada 'app'. y se podra ocupar con verbos(métodos: get,post,put,patch o delete)
const app = express();

// Analiza el cuerpo de las peticiones entrantes para poder leer la información en formato JSON a través de req.body
app.use(express.json());

//Ejecuta la función conectarBaseDatos() de conexionDb.js
const db =await conectarBaseDatos();

//on Escucha todo el tiempo, si la base de datos sufre un error avisara 
db.on('error', (error) => {
  console.log("Error en la conexion", error);
});


// Escucha una sola vez ('once') el evento 'open'. 
// Este evento se dispara cuando la conexión inicial se establece con éxito.
db.once ('open', () =>{
  console.log ("Conexion a la base de datos exitosa");
});



//MÉTODOS HTTTP con framework Express

// 1.- En cuanto el servidor escucha  la ruta http://localhost:3000 envia el mensaje
//  Nota: Recuerda que se ocupa 'app' (se usa con con sus verbos métodos http: get,post,put,patch y delete) la instancia de express del módulo 2-server.js


// Ruta GET ('/'): Endpoint raíz-principal para verificar el estado o bienvenida del servidor
app.get('/', (req,res)=>{
  res.status(200).send('Formación Node + Express + MonngoDB con servidor Express');
});

//2.-  Ruta GET  Trae la  lista de libros   *** ruta http://localhost:3000/libros ***
// Devuelve la lista completa de libros en formato JSON  

//formato de memoria VOLATIL
/*app.get('/libros',(req,res) =>{
//res.status(200).json(listaLibros);
});*/



// Ruta GET para '/libros': 
// Devuelve la lista completa de libros en formato JSON 
//app.get('/libros',(req,res) =>{

  app.get('/libros',async (req,res) =>{
//res.status(200).json(listaLibros); lista de memoria volatil
//find es un filtro en este caso lo dejaremos vacio 
const listalibrosModel = await libroModel.find({});
//  res.status(200).json(listalibros);
  res.status(200).json(listalibrosModel);
});

/*
// Ruta para obtener todos los libros (Lectura)
app.get('/libros', async (req,res) =>{
  // libroModel.find({}) busca todos los documentos en la colección de MongoDB que sigan la estructura del esquema.
  // El resultado de esa búsqueda (un arreglo) se guarda en la constante 'listaLibros'.
     const listaLibros = await libroModel.find({});
  // Respondemos con un estado 200 (OK) y enviamos el arreglo en formato JSON al cliente (Postman).
res.status(200).json(listaLibros);
});*/


//app.get('/libros',); 


// Función que busca el índice de un libro según su ID
// Devuelve el índice del arreglo (0, 1, 2...) o -1 si no existe
const buscarLibro = (id) => {
    return listaLibros.findIndex((libro)=> libro.id ===(id));
}

//se ocupa 'app' de la instancia de Express y se llama el método GET Consultando un libro por su parámetro de URL (:id)
//3.- Ruta GET Consulta libro por parámetro 'id' *** ('/libros/:id'), ejemplo: '/libros/:3'  ***
app.get('/libros/:id',(req,res)=>{
const id =Number(req.params.id);
//invoca el método buscarLibro
const index = buscarLibro(id);

// Validación: Si el libro no existe (índice -1), retorna un error HTTP 404 (Not Found)
  if (index === -1) {
    return res.status(404).json({ mensaje: "Libro no encontrado" });
  }

// Si existe, el servidor responde con el id de búsqueda de libro
  res.status(200).json(listaLibros[index]);
});


/*
 4.-  POST (CREAR UN LIBRO)
 Recibe un nuevo libro a través del cuerpo de la petición (req.body), lo guarda en el arreglo, gracias a app.use(express.json()); recibio en formato json 
y responde con un código 201 (Creado exitosamente)
app.post('/libros', (req,res)=>{
listaLibros.push(req.body);
res.status(201).send('Libro registrado correctamente...');
}); */

app.post('/libros',async (req,res)=>{
try {
  // 1. Creamos una nueva instancia del modelo 'libroModel' usando los datos que vienen en el cuerpo de la petición (req.body)
const nuevoLibro = new libroModel(req.body);
// 2. Guardamos el registro de forma permanente en MongoDB Atlas
    await nuevoLibro.save();
    res.status(201).json({ mensaje: 'Libro registrado correctamente...', libro: nuevoLibro  });
}catch (error) {
res.status(400).json({ mensaje: "Error al guardar el libro", detalle: error.message });
}
});


//5.- PUT  Actualiza las propiedades completas del libro 
// para hacer la actualizacion necesita de la ruta http://localhost:3000/libros/libros/:id (Ejemplo: http://localhost:3000/libros/2)
// entoces se hace el cambio en el body text Json
app.put('/libros/:id',(req,res) =>{
    const id =Number(req.params.id);
    const index = buscarLibro(id);

// ESCUDO: Verificamos que el libro exista antes de intentar modificarlo
    if (index !== -1) {

// Actualizamos el título con el valor que viene en el body
    listaLibros[index].titulo =req.body.titulo;

    //trae nuevamente la lista libros con la nueva actualización 
    res.status(200).json(listaLibros);
} else {
        // Si no existe, evitamos que el servidor se caiga y enviamos un error
        res.status(404).send('Error: El libro que intentas actualizar no existe.');
    }
});

// 6.- DELETE: Elimina libros 
app.delete('/libros/:id',(req,res)=>{
  // Convierte el ID recibido en la URL a número y lo guarda
    const id =Number(req.params.id);
  // Llama a buscarLibro para obtener la posición exacta (índice) del libro en el arreglo
    const index = buscarLibro(id);
    // splice: se posiciona en el 'index' encontrado y borra 1 solo elemento desde ahí
    listaLibros.splice(index, 1);
    res.status(200).send('Libro borrado con éxito... ');
});

// Exporta el módulo 'app' para que pueda ser importado y utilizado
export default app;


