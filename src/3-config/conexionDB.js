/**
 * Configuración de la conexión a MongoDB utilizando Mongoose con la nube, porque creamos nuestro proyecto, cluster y base de datos desde la nube desde la nube de MongoDB Atlas.
 * 
 * Se hace la conexion a la base de datos de la nube MongoDB
 * 
 * Mongoose actúa como ODM (Object Document Mapper), sirviendo de intermediario
 * para interactuar con los datos de la BD desde el código.
 */


// MongoDB es el motor donde residen (guardan) los datos.
// Mongoose es la librería que utilizo en el código para abrir la comunicación (mongoose.connect) a la BD.
// La conexión se establece a través de los métodos que proovee Mongoose

import mongoose from "mongoose";
import 'dotenv/config';


//Se define una función asíncrona porque conectarse a internet o a una base de datos toma tiempo, y el programa necesita "esperar" a que esa conexión se establezca.
async function conectarBaseDatos(params) {

    // Esta instrucción hace la conexión a la base de datos en la nube (MongoDB Atlas), a la cual se accede a través de la variable DB_CONNECTION_STRING.
    // Ejecutamos la acción y ESPERAMOS (await) a que termine.
     mongoose.connect (process.env.DB_CONNECTION_STRING);


     //Si la conexión es exitosa, la aplicación puede empezar a guardar o leer datos (CRUD) en MongoDB de manera persistente. 
     //mongoose.connection es uun objeto global por eso no se crea variable y solo se retorna 
    return mongoose.connection;
    
}
export default conectarBaseDatos;