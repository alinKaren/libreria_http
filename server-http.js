/**
 * ARCHIVO DE REFERENCIA: SERVIDOR HTTP NATIVO (SIN EXPRESS)
 * ---------------------------------------------------------
 * Este código muestra la forma "nativa" y manual de crear un servidor web 
 * utilizando únicamente el módulo 'http' de Node.js.
 * 
 * NOTA: Este enfoque ya no se utiliza en el desarrollo de nuestra API, 
 * ya que el framework Express simplifica el enrutamiento y la lógica. 
 * Se conserva únicamente con fines educativos y de comparación.
 */

// Importa el módulo nativo 'http' que viene incluido en Node.js
import http from 'http';

// Crea el servidor. El callback se ejecuta cada vez que alguien visita la página.
const server = http.createServer((req, res) => {
    
    // 'req' (request/solicitud): Contiene toda la información que envía el cliente o navegador.
    // 'res' (response/respuesta): Objeto que usamos para construir y devolver la información.

    // Configura la cabecera de la respuesta:
    // - 200: Código de estado HTTP que significa "Éxito" (OK).
    // - "Content-Type": Le avisa al navegador que el contenido que va a recibir es texto plano.
    res.writeHead(200, { "Content-Type": "text/plain" });

    // Envía el texto de respuesta al cliente y cierra la conexión para esa petición.
    res.end('Hello World\n');
});

// Pone al servidor en estado de "escucha" en el puerto 3000.
// El callback imprime un mensaje en la terminal para confirmar que todo arrancó bien.
server.listen(3000, () => {
    console.log('Servidor nativo iniciado en http://localhost:3000');
});