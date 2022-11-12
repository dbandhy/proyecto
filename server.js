// importar librería

const express = require("express")
const router = express.Router();
const { routerWeb } = require("./routers/routerWeb.js")
const { routerApi } = require("./routers/routerApi.js")

//luego de definir funciones, paso a los controladores

const app = express()
app.use(express.static('views'));


//middleware. Interpreta json y formularios
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use("/views", express.static("views"))

//RUTAS
 app.use("/", routerWeb)
 app.use("/api/peliculas", routerApi)
 app.use("/api/peliculas/id", routerApi)

 const server = app.listen(8080, () => {
    console.log(`conectado al puerto ${server.address().port}`)
 })