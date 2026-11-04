// Importa la instancia de la aplicación Express del archivo app.js
import app from './src/1-app.js';  

// Define el puerto en el que vivirá nuestro servidor.
// Guardarlo en una constante es una buena práctica porque facilita cambiarlo 
// en un solo lugar si en el futuro necesitamos usar otro puerto (ej. 8080).
const PORT=3000;

// app.listen() arranca el servidor y lo pone a "escuchar" las peticiones entrantes.

// Esta función (callback) se ejecuta automáticamente SOLO cuando el servidor 
// logra arrancar con éxito. Nos sirve para confirmar en la terminal que todo está bien.

app.listen(PORT,() =>{

// Tip: Usamos backticks (``) para poder inyectar la variable PORT dentro del texto
console.log(`Servidor Express iniciado y escuchando en http://localhost:${PORT}`);
});