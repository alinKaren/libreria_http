//Importa la librería  Mongoose es el ODM. (Mapeador Objeto-Documento)
//Mongoose es un ODM que permite interactuar con tus datos utilizando objetos y métodos propios del lenguaje de programación. 
// El ODM se encarga de "traducir" automáticamente estas acciones a las instrucciones que la base de datos entiende.
import mongoose from "mongoose";




//Se defiine "Esquema" de Mongoose. Un esquema es un "molde" o plano que define qué campos (propiedades) va a tener cada libro en la base de datos y de qué tipo de dato
const libroSchema  = new  mongoose.Schema({
    id : { type: mongoose.Schema.Types.ObjectId}, //tendra un campo por defdecto iid creado auutomatiicamente de la libreria mongoose
    titulo:  { type: String, required: true },
    editor:  { type: String },
    precio:  { type: Number},
    paginas: { type: Number},
}, {versionKey: false });//indica que guardara la version en el documento; pero al colocar 'false' no lo agregara como campo 


//Toma el "molde" (libroSchema) y lo compila en un Modelo de Mongoose. 
// Es decir "Crea un modelo llamado 'libros' en la base de datos, usando la estructura de libroSchema". 
// Este modelo libros es el objeto que usare en el resto de tu aplicación para buscar, crear, actualizar o eliminar libros reales.
//
//
const libros = mongoose.model('libros', libroSchema );

export default libros; 