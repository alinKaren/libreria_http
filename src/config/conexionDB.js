// Conectar una base de datos MongoDB con la API 
// utilizando Mongoose (que actúa como un ODM) herramienta de programación que actúa como  traductor entre el código de la aplicación y una base de datos NoSQL basada en documentos (como MongoDB).
// y gestionar los errores de esa conexión.


//Trae la librería Mongoose para conectarte a la base de datos
import mongoose from "mongoose";



//Se define una función asíncrona porque conectarse a internet o a una base de datos toma tiempo, y el programa necesita "esperar" a que esa conexión se establezca.
async function conectarBaseDatos(params) {

    //Esta es la instrucción clave que hace la conexión a la base de datos en la nube (MongoDB Atlas) mongoose es su propia valriable 
    
     mongoose.connect ('mongodb+srv://menesesalin_db_user:admin123@clusterlibreriabd.lr4qf4x.mongodb.net/libreria_alura?appName=ClusterLibreriaBD');


     //Si la conexión es exitosa, esta línea devuelve el objeto de la conexión para que el resto de tu aplicación sepa que ya puede empezar a guardar o leer datos.
    return mongoose.connection;
    
}
export default conectarBaseDatos;