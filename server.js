
// importar librería
const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io')
const { Archivo } = require('./contenedor/contenedor.js')

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


// app.get('/', () => {
//    res.send("OK")
// })


const mensajes = []

// const personas = []
// //PARECIDO A MANEJAR EVENTOS
// io.on('connection', (socket) => {

//    socket.emit('personas', personas)

//    socket.on('update', persona => {
//       persona.fecha = new Date().toLocaleString()
//       personas.push(persona)
//       io.sockets.emit('personas', personas)
//    })
// })

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
   
})

//middleware. Interpreta json y formularios
 app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use("/public", express.static("public"))



app.get('/peliculas', async(req, res) => {
   const peliculas = await contenedor.leer();
   res.render('pages/list', {peliculas})
})

app.post('/peliculas', async(req,res) => {
   const {body} = req;
   await contenedor.guardar(body);
   res.redirect('/');
})

app.get('/chat', async(req, res) => {
   const chat = await contenedor.leer();
   res.render('pages/list', {chat})
})
app.post('/chat', async(req, res) => {
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





