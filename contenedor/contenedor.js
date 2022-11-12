const fs = require("fs");

class Archivo {
    constructor() {
        this.filepath = './peliculas.txt'
    }

    async leer () {

        try {
            const peliculas = await fs.promises.readFile(this.filepath, 'utf-8')
            return JSON.parse(peliculas);
        } catch (err) {
            return [];
        }
  
    }

    async borrar () {
        await fs.promises.unlink(this.filepath);
    }
    
 
    async guardar (titulo, precio, thumbnail) {
        try {
            const peliculas = await this.leer()
            const nuevaPelicula = {
                titulo,
                precio,
                thumbnail,
                id: peliculas.length + 1,
            };
            peliculas.push(nuevaPelicula);
            await fs.promises.writeFile(this.filepath, JSON.stringify(peliculas, null, 2));
            return `Se ha agregado pelicula ${titulo}`;
        } catch (err) {
            console.log('error'. err);
        }

    }

    async getById(id) {

        try {
        
        let peliculasGuardados = await fs.promises.readFile(this.filepath,"utf-8")
        const arrayDePeliculas = JSON.parse(peliculasGuardados);
        let peliFound = arrayDePeliculas.find((ele) =>
                ele.id === id ? ele : undefined
        
        );
         //await fs.promises.writeFile(this.filepath, JSON.stringify(peliFound))
        
        console.log(peliFound);
        } catch (error) {
        
        console.log(error);
            }
        
        }

        async deleteById(id) {
            //await fs.promises.unlink(this.filepath)
            try{

              let peliculasCompletas = await fs.promises.readFile(this.filepath, "utf-8")
              let peliculaConId = JSON.parse(peliculasCompletas);
            
              let peliculaSinId = peliculaConId.filter(nuevaPelicula => nuevaPelicula.id != id  ) //-1
              await fs.promises.writeFile(this.filepath, JSON.stringify(peliculaSinId))
              //console.log(peliculaSinId)  
                   
            } catch (error) {
            
            console.log(error, "no funciona ");
            
            }
            
            }
    
}


 const main = async () => {
     const manejadorDeArchivos = new Archivo();
   console.log("Leer: ", await manejadorDeArchivos.leer());
  // console.log(await manejadorDeArchivos.guardar("Argentina 1985", 100, "immagen.png"));
  // console.log(await manejadorDeArchivos.guardar("Titanic", 200, "imagen.png"));
  // console.log(await manejadorDeArchivos.guardar("Documental Mundial", 300, "poster.png"));
  // console.log("Leer: ", await manejadorDeArchivos.leer());
  // console.log( await manejadorDeArchivos.getById(2));
  //  console.log( await manejadorDeArchivos.deleteById(2));
  //  console.log("Leer: ", await manejadorDeArchivos.leer())
  //  console.log( await manejadorDeArchivos.deleteById(1));
  //  console.log("Leer: ", await manejadorDeArchivos.leer())

//     setTimeout( async () => {
//         await manejadorDeArchivos.borrar();
//     }, 5000);
    
//     console.log("Leer: ", await manejadorDeArchivos.leer());
}

//main();

module.exports = {Archivo}
