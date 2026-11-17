// Importa el módulo app.js para ocupar el objeto de app 
import app from './src/1-app.js';  

// Define el puerto en el que vivirá nuestro servidor.
// Guardarlo en una constante es una buena práctica porque facilita cambiarlo 
const PORT=3000;

// app.listen() arranca el servidor y lo pone a "escuchar" las PETICIONES/SOLICITUDES/requisicion entrantes.

app.listen(PORT,() =>{

//El mensaje console confirmará en la terminal que todo está bien.
console.log(`Servidor Express iniciado y escuchando en http://localhost:${PORT}`);
});