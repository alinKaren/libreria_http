 
 /****(CON EXPRESS)**** CREACION DE SERVIDOR LOCAL Y GESTION DEL SERVIDOR HTTP 
 * ---------------------------------------------------------
 */

//framework (estructura base predefinida sobre la cual construyes tu aplicación. No solo te da herramientas, sino que te impone una arquitectura,
//  unas reglas y una forma específica de organizar tus archivos.) de Node.js 
// diseñado específicamente para crear servidores web y APIs de forma rápida y ordenada.

//importamos express en nuestra app  del paquete express
import express from "express";
import conectarBaseDatos from "./config/conexionDB.js";
import libroModel from "./models/libros.js";


// Crea una instancia proncipal de la aplicación Express llamada 'app'
const app = express();

// Middleware: El middleware es el recepcionista que te pide identificación; si todo está en orden, te deja pasar (next()), y si no, 
// te niega la entrada (envía un mensaje de error).

app.use(express.json());
//Ejecuta la función conectarBaseDatos() de conexionDb.js
const db =await conectarBaseDatos();

//Escucha todo el tiempo, si la base de datos sufre un error avisara 
db.on('error', (e) => {
  console.log("Error en la conexion", error);
});

//once escucha un evento de apertura (open) una sola vez y envia el mensaje. 
db.once ('open', () =>{
  console.log ("Conexion a la base de datos exitosa");
});


/*
// Simula una base de datos temporal usando un arreglo de objetos con una lista de libros
const listaLibros = [
    {
        id: 1,
        titulo: 'El señor de los anillos',
    },

    {
        id: 2, 
        titulo: 'Don Quijote',
    }
];
*/

// Ruta GET ('/'): Endpoint raíz-principal para verificar el estado o bienvenida del servidor
app.get('/', (req,res)=>{
  res.status(200).send('Formación Node + Express + MonngoDB con servidor Express');
});



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


// Función que busca el índice de un libro según su ID
// Devuelve el índice del arreglo (0, 1, 2...) o -1 si no existe
const buscarLibro = (id) => {
    return listaLibros.findIndex((libro)=> libro.id ===(id));
}

//se ocupa app de la instancia de express y se llama el método GET Consultando un libro por su parámetro de URL (:id)
app.get('/libros/:id',(req,res)=>{
const id =Number(req.params.id);
//invoca el método buscarLibro
const index = buscarLibro(id);


// Validación: Si el libro no existe (índice -1), retorna un error HTTP 404 (Not Found)
  if (index === -1) {
    return res.status(404).json({ mensaje: "Libro no encontrado" });
  }

// Si existe, retorna el objeto encontrado con código 200 (OK)
//responde el servidor de la listaLibros con el id de búsqueda 
  res.status(200).json(listaLibros[index]);
});


// Ruta POST para '/libros' (CREAR UN LIBRO):
// Recibe un nuevo libro a través del cuerpo de la petición (req.body), lo guarda en el arreglo 
// y responde con un código 201 (Creado exitosamente)
app.post('/libros', (req,res)=>{
listaLibros.push(req.body);
res.status(201).send('Libro registrado correctamente');
});


//Actualización del libro solo en la propiedad titulo
app.put('/libros/:id',(req,res) =>{
    const id =Number(req.params.id);
    const index = buscarLibro(id);

    listaLibros[index].titulo =req.body.titulo;
    //trae nuevamente la lista para que se verifique si hubo una actualizacion 
    res.status(200).json(listaLibros);

});

app.delete('/libros/:id',(req,res)=>{
    const id =Number(req.params.id);
    const index = buscarLibro(id);
    listaLibros.splice(index, 1);
    res.status(200).send('Libro borrado con éxito');

});
// Exporta el módulo 'app' para que pueda ser importado y utilizado
export default app;


