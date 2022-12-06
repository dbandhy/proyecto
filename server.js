
// importar librería
const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io')
const { Archivo } = require('./contenedor/contenedor.js')
const fs = require('fs')
const app = express()
const httpServer = new HttpServer(app);
const io = new Socket(httpServer)

const router = express.Router();

const { engine } = require('express-handlebars')

//SOCKET. NEcesita http en server y necesita evento en html

let contenedor = new Archivo("peliculas.json");
let chat = new Archivo("chat.txt")

//luego de definir funciones, paso a los controladores


app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'hbs');

app.engine('hbs', engine({
   extname: '.hbs',
   defaultLayout: 'index.hbs',
   layoutsDir: __dirname + '/views/layouts',
   partialsDir: __dirname + '/views/partials'
}))


// const chatParseado= JSON.parse(fs.readFileSync("chatMensajes.txt"))
io.on('connection', async(socket) => {
   console.log('🟢 Usuario conectado')
   
   const peliculas = await contenedor.leer();
   socket.emit('bienvenidoLista', peliculas )
   
   const mensajes = await chat.leer();
   socket.emit('listaMensajesBienvenida', mensajes)
   
   socket.on('nuevoMensaje', async(data) => {
       await chat.guardar(data);
       
       const mensajes = await chat.leer();
       io.sockets.emit('listaMensajesActualizada', mensajes)
   })

   socket.on('productoAgregado', async(data) => {
       console.log('Alguien presionó el click')
       await contenedor.guardar(data);
       
       const peliculas = await contenedor.leer();
       io.sockets.emit('listaActualizada', peliculas);
   })
   
   socket.on('disconnect', () => {
       console.log('🔴 Usuario desconectado')
   })


   //SEGUNDO FORMULARIO
   socket.emit("messages",'chatMensajes.txt')
   socket.on("new_message", async(mensaje) =>{   
       chatParseado.push(mensaje);
       io.sockets.emit("messages", 'chatMensajes.txt')
       await fs.promises.writeFile("chatMensajes.txt", JSON.stringify('chatMensajes.txt'))
       
   })

})


//middleware. Interpreta json y formularios
 app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use("/public", express.static("public"))

// app.get('/peliculas', async(req, res) => {
//    const traerProductos = async () => {
//       try{
//           const data = await contenedor.leer()
//           res.render('pages/list', {data}) 
          
          
//       }catch(error){
//           throw new Error(error)
//       }
//   };
//   traerProductos()
// })
   
// app.post('/peliculas', async(req, res) => {
//    const agregarProducto = async() => {
//       try{
//           const objetoNuevo = req.body
//           console.log(objetoNuevo)
//           await contenedor.guardar(objetoNuevo)
//           res.redirect("/") 
//       }catch(error){
//           throw new Error(error)
//       }
//   }
//   agregarProducto()
// })


// app.get('/', (req,res) => {
//    const traerProductos = async () => {
//       try{
//           const data = await contenedor.leer()
//           res.render('pages/form', {data:data}) 
          
          
//       }catch(error){
//           throw new Error(error)
//       }
//   };
//   traerProductos()

// })

// app.get('/chat', async(req, res) => {
//    const traerChat = async () => {
//       try{
//           const data = await chat.leer()
//           res.render('pages/form', {data:data}) 
          
          
//       }catch(error){
//           throw new Error(error)
//       }
//   };
//   traerChat()
// })

app.get('/peliculas', async(req, res) => {
   const peliculas = await contenedor.leer();
   res.render('pages/list', {peliculas})
})

app.post('/peliculas', async(req,res) => {
   const {body} = req;
   await contenedor.guardar(body);
   res.redirect('/');
})

app.get('/', (req,res) => {
   res.render('pages/form', {})
})




 //LISTEN
 const server = httpServer.listen(8080, () => {
    console.log(`conectado al puerto ${server.address().port}`)
 })


 server.on('error', (err) => console.log(err))





