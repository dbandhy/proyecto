//const { randomUUID } = require("crypto");
const { Archivo } = require ("../contenedor/contenedor")
const archivo =  new Archivo("peliculas.json")


//DESAFIO
//Get
 async function controladorGetPelis (req, res) {
     const stock = await archivo.leer();
    res.status(200).json(stock)
}

exports.controladorGetPelis = controladorGetPelis;
//controladorPost envía cosas

async function controladorPostPelis(req, res) {
    const { body } = req
    const nuevaPelicula = await archivo.guardar(body)
    res.status(200).send(`Producto agregado con el ID: ${nuevaPelicula}`)
    
    // nuevaPeli = req.body;
    // nuevaPeli.id = randomUUID();
    // pelis.push(nuevaPeli);
    // res.status(201);
    // res.json(nuevaPeli);
}


exports.controladorPostPelis = controladorPostPelis;

async function controladorGetPelisSegunId({ params: { id } }, res) {
    
    const buscarPorId = await archivo.getById(id);
    if (!buscarPorId) {
        res.status(404);
        res.json({ message: `No se encontró pelicula con ese (${id})` });
    } else {
        res.json(buscarPorId);
    }
}


exports.controladorGetPelisSegunId = controladorGetPelisSegunId;

async function controladorPutPelisSegunId( req , res) {
    const {id} = req.params;
    const { body } = req;
    const ActualizarId = await archivo.updateById(id,body);
    if (!ActualizarId) {
    res.status(200).send(`LA película de ID: ${id} fue actualizada`);
        } else {
        res.status(404).send((`No se encontró el ID: ${id}`));
    }

    
}

exports.controladorPutPelisSegunId = controladorPutPelisSegunId;


async function controladorDeletePelisSegunId({ params: { id } }, res) {
    const eliminarPeli = await archivo.getById(id);
    if (!eliminarPeli == -1) {
        res.status(404).send(`Se borró el ID: ${id}`);
    } else {
        res.status(200).send(`No se borró el ID: ${id}`)
    }
}


exports.controladorDeletePelisSegunId = controladorDeletePelisSegunId;
