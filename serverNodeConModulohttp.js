/**
 * ARCHIVO DE REFERENCIA: SERVIDOR LOCAL UTILIZANDO  EL MÓDULO HTTP  DE NODE.JS ****(SIN EXPRESS)****
 * ---------------------------------------------------------
 * Este código muestra la forma "nativa" y manual de crear un servidor web 
 * 
 * NOTA: Este enfoque ya no se utiliza en el desarrollo de nuestra API, 
 * ya que el framework Express simplifica el enrutamiento y la lógica. 
 * Se conserva únicamente con fines educativos y de comparación.
 * */

 

// Importa el módulo nativo 'http' que viene incluido en Node.js
import http from 'http';

// Crea el servidor. El callback se ejecuta cada vez que alguien visita la página.
const server = http.createServer((req, res) => {
    
    // 'req' (request/solicitud): Contiene toda la información que envía el cliente o navegador.
    // 'res' (response/respuesta): Objeto que usamos para construir y devolver la información.
    
//Se declara un objetos de rutas / diccionario para definir qué contenido mostrar dependiendo de la URL visitada:
const rutas =   {
        '/' : 'Fomación Node + Express + MongoDB',
        '/autores' : 'Estos son los autores', 
        '/libros' : 'Estos son los libros', 
        '/categorias' : '<strong> Estas son las categorias </strong>'
    }

    // Configura la cabecera de la respuesta:
    // - 200: Código de estado  de respueta HTTP que significa "Éxito" (OK).
    // - "Content-Type": Le avisa al navegador que el contenido que va a recibir es texto plano.
    // "text/plain" = texto plano -  res.writeHead(200, { "Content-Type": "text/plain" });
     res.writeHead(200, { "Content-Type": "text/html" });
   //console.log(req.url)
    // Envía el texto de respuesta al cliente y cierra la conexión para esa petición.  // res.end('Hello World\n');
    res.end(rutas[req.url] || 'Ruta no encontrada');
});

// 1. Configuramos qué hacer si ocurre un error al intentar abrir el puerto
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.log('Error: El puerto 3000 ya está siendo usado por otro programa.');
    } else {
        console.log('Ocurrió un error inesperado al iniciar el servidor:', error);
    }
});
// 2. Intentamos encender el servidor normalmente
// Pone al servidor en estado de "escucha" en el puerto 3000.
// El callback imprime un mensaje en la terminal para confirmar que todo arrancó bien.
server.listen(3000, () => {
    console.log('Servidor nativo local iniciado en http://localhost:3000 del mdulo :: serverNodeConModulohttp.js');
}); 