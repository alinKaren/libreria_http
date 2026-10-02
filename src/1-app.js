
// Importa el framework Express para la creación y gestión del servidor HTTP
import express from "express";
import conectarBaseDatos from "./config/conexionDB.js";


// Crea una instancia proncipal de la aplicación Express llamada 'app'
const app = express();



// Middleware: Permite que nuestra aplicación reciba e interprete datos en formato JSON 
// (Obligatorio para que 'req.body' funcione en las peticiones POST, PUT O PATCH)

app.use(express.json());

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

const db =await conectarBaseDatos();


db.on('error', (e) => {
  console.log("Error en la conexion", error);
});

db.once ('open', () =>{
  console.log ("Conexion a la base de datos exitosa");
});




app.get('/', (req,res)=>{
  res.status(200).send('Formación Node + Express + MonngoDB con servidor Express');
});



// Ruta GET para '/libros': 
// Devuelve la lista completa de libros en formato JSON 
app.get('/libros',(req,res) =>{
res.status(200).json(listaLibros);
});


// Función que busca el índice de un libro según su ID
// Devuelve el índice del arreglo (0, 1, 2...) o -1 si no existe
const buscarLibro = (id) => {
    return listaLibros.findIndex((libro)=> libro.id ===(id));

}

// Ruta GET ('/libros/:id'): Consulta un libro por su parámetro de URL (:id)
app.get('/libros/:id',(req,res)=>{
const id =Number(req.params.id);
//invoca el metodo buscarLibro
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
    //trae nuevamente la lista para que se verifique si hubo una actuualizacion 
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


