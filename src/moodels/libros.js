import mongoose from 'mongoose'

//Define un esquema general de las propiedades de libro con mongoose.Schema y se guarada en la variable libroEsquema
// Aquí establecemos qué campos existirán, sus tipos de datos y sus reglas.
const libroEsquema = new mongoose.Schema({
    // Nota: Mongoose crea automáticamente un campo '_id' de tipo ObjectId, no necesito definirlo manualmente.
    titulo: {
        type: String,
        required:true, // Regla: Este campo es obligatorio para poder guardar el libro.
    },
    editorial: {
        type: String, 
    },
    precio: {
        type: Number,
    },
    paginas: {
        type:Number,
    }
}, 
//Desactiva el campo '__v' que Mongoose añade por defecto para controlar el versionado interno.
{versionKey: false});


//         1er argumento                                           2do argumento                                                    3er argumento
//      (Apodo en  mi código)                                 Nombre del Esquema con sus                                (Nombre EXACTO de la collection en Atlas)
//  se usa para conectar otros esquemas                           Datos requeridos                                     es para que Mongoose sepa exactamente dónde 
//     dentro del mismo código javascript                                                                                    guardar la información en MongoDB.

const libroModel = mongoose.model('Libro', libroEsquema, 'librosDrama');

// Exporta el modelo para que otros archivos puedan usarlo (ej. para hacer libroModel.find() o libroModel.create())
export default libroModel;

