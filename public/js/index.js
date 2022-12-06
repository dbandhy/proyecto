const socket = io();
const boton = document.getElementById("enviar")
boton.addEventListener("click", ()=> {
    const email = document.getElementById("email").value
    const mensaje = document.getElementById("mensaje").value
    const date = `${new Date().toLocaleDateString()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
    const objetoMensaje = {
        email,
        date ,
        mensaje
    }
    socket.emit("new_message", objetoMensaje)
})

const crearEtiquetas =(mensajes) => {
    const {email,date,mensaje} = mensajes
    return `
    <div>
        <strong id="estilo">${email}</strong>
        <strong id="fecha">[${date}] :</strong>
        <em id="message">${mensaje}</em>
    </div>`
}

const agregarMensaje= (mensajes) =>{
    const mensajeFinal = mensajes.map(mensaje => crearEtiquetas(mensaje)).join("")
    console.log(mensajeFinal) 
    document.getElementById("chat").innerHTML= mensajeFinal
}

socket.on("messages", (messages) => agregarMensaje(messages))




        const btn = document.getElementById('btn-submit');
        const btnMensaje = document.getElementById('btn-submit-mensaje');
        
        const inputTitle = document.getElementById('input-title');
        const inputPrice = document.getElementById('input-price');
        const inputImg = document.getElementById('input-img');
        
        btnMensaje.addEventListener('click', (evt) => {
            evt.preventDefault();
            const email = document.getElementById('input-email').value;
            const mensaje = document.getElementById('input-mensaje').value;
            
            if (email !== '' && mensaje !== '') {
            
                socket.emit('nuevoMensaje', {
                    "email" : email,
                    "message" : mensaje,
                    "date" : new Date().toLocaleString()
                })
            }
            
        })
        
        
        btn.addEventListener('click', (evt) => {
            
            const title = inputTitle.value;
            const price = inputPrice.value;
            const img = inputImg.value;
            
            if (title !== '' && price !== '' && img !== '') {
                socket.emit('productoAgregado',{
                    "title": title,
                    "price": price,
                    "thumbnail": img
                })
            }
            
            
        })
        
        socket.on('listaMensajesActualizada', (data) => {
            console.log(data);
            $('#historial-mensajes').empty();
            data.forEach( (mensaje) => {
                $('#historial-mensajes').append(
                `
                <small style="display:block"> - <em style="color:#9f9f9f">[${mensaje.date}]</em> <strong style="color:green">${mensaje.email}</strong>: ${mensaje.message} </small>
                `
                )
            })
        })
        
        socket.on('listaMensajesBienvenida', (data) => {
            console.log(data);
            $('#historial-mensajes').empty();
            data.forEach( (mensaje) => {
                $('#historial-mensajes').append(
                `
                <small style="display:block"> - <em style="color:#9f9f9f">[${mensaje.date}]</em> <strong style="color:green">${mensaje.email}</strong>: ${mensaje.message} </small>
                `
                )
            })
        })
        
        socket.on('listaActualizada', (data) => {
            $('#table-body').empty();
            data.forEach( (element) => {
            
                $('#table-body').append(
                `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.title}</td>
                    <td>${element.price}</td>
                    <td>${element.thumbnail}</td>
                </tr>
                `
                )
            })
            
        })
        
        socket.on('bienvenidoLista', (data) => {
            $('#table-body').empty();
            data.forEach( (element) => {
            
                $('#table-body').append(
                `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.title}</td>
                    <td>${element.price}</td>
                    <td>${element.thumbnail}</td>
                </tr>
                `
                )
            })
            
        })
        

// const socket = io()

// function mostrarPeliculas(peliculas) {
//     const peliculasParaMostrar =peliculas.map(({fecha, autor, pedido}) => {
//         return `<li>${fecha} - ${autor} - ${pedido} </li>`
//     })

//     const peliculasHtml = 
//     `<ul>${peliculasParaMostrar.join(`\n`)}</ul>`

//     const listaPeliculas =document.getElementById('listaPeliculas')
//     listaPeliculas.innerHTML = peliculasHtml

// }

// //SOCKET ENVÍO

// socket.on('peliculasActualizadas', peliculas => {
//     mostrarPeliculas(peliculas)
// })

// const botonEnviar =document.getElementById('botonEnviar')
// botonEnviar.addEventListener('click', e => {
//     const inputAutor = document.getElementById('inputAutor')
//     const inputPedido = document.getElementById('inputPedido')

//     if (inputAutor.value && inputPedido.value) {
//         const mensaje = {
//             autor: inputAutor.value,
//             pedido: inputPedido.value
//         }
//         socket.emit('nuevoMensaje', mensaje)
//     } else {
//         alert('Ingrese pedido')
//     }
// })

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
