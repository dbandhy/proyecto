// importar librería
const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app);
const io = new Socket(httpServer)

const router = express.Router();


const { engine } = require('express-handlebars')

const { routerWeb } = require("./routers/routerWeb.js")
const { routerApi } = require("./routers/routerApi.js")
//SOCKET. NEcesita http en server y necesita evento en html


//luego de definir funciones, paso a los controladores


app.use(express.static('views'));
app.set('views', './views');
app.set('view engine', 'hbs');

app.engine('hbs', engine({
   extname: '.hbs',
   defaultLayout: 'index.hbs',
   layoutsDir: __dirname + '/views/layouts',
   partialsDir: __dirname + '/views/partials'
}))


app.get('/', () => {
   res.send("OK")
})

//const mensajes = []

const personas = []
//PARECIDO A MANEJAR EVENTOS
io.on('connection', (socket) => {

   socket.emit('personas', personas)

   socket.on('update', persona => {
      persona.fecha = new Date().toLocaleString()
      personas.push(persona)
      io.sockets.emit('personas', personas)
   })
})


// io.on('connection', socket => {
//    //se ejecuta la primera vez que se abre una conexión
//    console.log('usuario conectado' + socket.id)

//    //se imprimirá solo la primera vez que se ejecuta una conexión
//    socket.emit('mi mensaje', 'Este es el mensaje desde el servidor')

//    socket.on('msg-cliente', data => {
//       console.log(`(server) recibí: ${data} `)
//    })
   
//    socket.on('saludo', data => {
//       console.log(`(server) recibí: ${data} `)
//    })
//    io.sockets.emit('mi mensaje', 'esto lo recibe todo el mundo')
      
   
// })

//middleware. Interpreta json y formularios
 app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use("/views", express.static("views"))

// Multer config
// const multer = require('multer');
// const storage = multer.diskStorage({
//    destination: function(req, file, cb) {
//       cb(null, 'uploads')
//    },
//    filename: function(req, file, cb) {
//       cb(null, `${Date.now()}-${file.originalname}`)
//    }
// })

// const upload = multer({ storage: storage })
// const middlewareDeImagenes = upload.single("miArchivo")


//RUTAS
// app.use("/", routerWeb)
 app.use("/api/peliculas", routerApi)
 app.use("/api/peliculas/id", routerApi)
//  app.post("/imagenes", middlewareDeImagenes, (req, res) => {
//    const file = req.file
//    if(!file) {
//       res.status(400)
//       return res.send("Error al subir archivo")
//    }
//    res.send(`ARchivo <b> ${file.originalname}</b> subió de forma correcta`)
//  })

 //LISTEN
 const server = httpServer.listen(8080, () => {
    console.log(`conectado al puerto ${server.address().port}`)
 })








// // importar librería
// const express = require('express');
// const { Server: HttpServer } = require('http');
// const { Server: Socket } = require('socket.io')

// const app = express()
// const httpServer = new HttpServer(app);
// const io = new Socket(httpServer)

// const router = express.Router();


// //const { engine } = require('express-handlebars')

// const { routerWeb } = require("./routers/routerWeb.js")
// const { routerApi } = require("./routers/routerApi.js")
// //SOCKET. NEcesita http en server y necesita evento en html


// //luego de definir funciones, paso a los controladores


// app.use(express.static('views'));

// app.get('/', () => {
//    res.send("OK")
// })

// const mensajes = []
// //PARECIDO A MANEJAR EVENTOS
// io.on('connection', (socket) => {

//    socket.emit('mensajesActualizados', mensajes)

//    socket.on('nuevoMensaje', mensaje => {
//       mensaje.fecha = new Date().toLocaleString()
//       mensajes.push(mensaje)
//       io.sockets.emit('mensajesActualizados', mensajes)
//    })
// })


// // io.on('connection', socket => {
// //    //se ejecuta la primera vez que se abre una conexión
// //    console.log('usuario conectado' + socket.id)

// //    //se imprimirá solo la primera vez que se ejecuta una conexión
// //    socket.emit('mi mensaje', 'Este es el mensaje desde el servidor')

// //    socket.on('msg-cliente', data => {
// //       console.log(`(server) recibí: ${data} `)
// //    })
   
// //    socket.on('saludo', data => {
// //       console.log(`(server) recibí: ${data} `)
// //    })
// //    io.sockets.emit('mi mensaje', 'esto lo recibe todo el mundo')
      
   
// // })

// //middleware. Interpreta json y formularios
//  app.use(express.json())
// app.use(express.urlencoded({ extended:true }))

// app.use("/views", express.static("views"))

// // Multer config
// // const multer = require('multer');
// // const storage = multer.diskStorage({
// //    destination: function(req, file, cb) {
// //       cb(null, 'uploads')
// //    },
// //    filename: function(req, file, cb) {
// //       cb(null, `${Date.now()}-${file.originalname}`)
// //    }
// // })

// // const upload = multer({ storage: storage })
// // const middlewareDeImagenes = upload.single("miArchivo")


// //RUTAS
// // app.use("/", routerWeb)
//  app.use("/api/peliculas", routerApi)
//  app.use("/api/peliculas/id", routerApi)
// //  app.post("/imagenes", middlewareDeImagenes, (req, res) => {
// //    const file = req.file
// //    if(!file) {
// //       res.status(400)
// //       return res.send("Error al subir archivo")
// //    }
// //    res.send(`ARchivo <b> ${file.originalname}</b> subió de forma correcta`)
// //  })

//  //LISTEN
//  const server = httpServer.listen(8080, () => {
//     console.log(`conectado al puerto ${server.address().port}`)
//  })