const socket = io()

function mostrarPeliculas(peliculas) {
    const peliculasParaMostrar =peliculas.map(({fecha, autor, pedido}) => {
        return `<li>${fecha} - ${autor} - ${pedido} </li>`
    })

    const peliculasHtml = 
    `<ul>${peliculasParaMostrar.join(`\n`)}</ul>`

    const listaPeliculas =document.getElementById('listaPeliculas')
    listaPeliculas.innerHTML = peliculasHtml

}

//SOCKET ENVÍO

socket.on('peliculasActualizadas', peliculas => {
    mostrarPeliculas(peliculas)
})

const botonEnviar =document.getElementById('botonEnviar')
botonEnviar.addEventListener('click', e => {
    const inputAutor = document.getElementById('inputAutor')
    const inputPedido = document.getElementById('inputPedido')

    if (inputAutor.value && inputPedido.value) {
        const mensaje = {
            autor: inputAutor.value,
            pedido: inputPedido.value
        }
        socket.emit('nuevoMensaje', mensaje)
    } else {
        alert('Ingrese pedido')
    }
})

// socket.on('mi mensaje', data => {
//     console.log('(cliente) ' + data)

//     socket.emit('msg-cliente', `(cliente) recibi ${data}`)
// })

// socket.on('heartbeat', () => {
//     console.log('todo OK')
    
// })

// function saludar() {
//     socket.emit('saludo', 'saludo desde el cliente')
// }

// const botonSaludar = document.getElementById('botonSaludar')
// botonSaludar.addEventListener('click', e => {
//     saludar()
// })
