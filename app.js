
const express = require('express')
const repositorio = require('./Contenedor.js')
const mysqlOptions = require('./optionsMySql')
const sqlLiteOptions = require('./optionsSqlLite3')
const script = require('./createTable.js')

const dbProductos = new repositorio(mysqlOptions,"productos")
const dbMensajes = new repositorio(sqlLiteOptions,"mensajes")

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
//const { json } = require('express/lib/response')
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));

script(mysqlOptions,sqlLiteOptions)

    io.on('connection', (socket) => {                                    
            let productos = dbProductos.getAll()
                                        .then(()=> {               
                                            socket.emit(productos)       
                                        })                                                                     
                                        .catch((error)=>console.log(error))
                                        //.finally(()=>dbProductos.disconnect())
                    
        socket.on('addProduct',(payload)=>{ 
            dbProductos.save(payload)
                        .then(()=>{
                            dbProductos.getAll()  
                                        .then((productos)=>{                                           
                                        io.sockets.emit('productos',productos)
                                        })                      
                        })
                        .catch((err)=>console.log(err))
            
        })

        socket.on('chateando',async (chat)=>{         
              dbMensajes.save(chat)
                        .then(id => 
                            dbMensajes.getAll()
                                    .then(chats => {  
                                     io.sockets.emit('mensajes',chats) }))                             
                                   // io.sockets.emit('mensajes',JSON.parse(chats) ) }))                           
                        .catch(e=>
                        console.log(e))
                                
        })
          
    })
 
        //////////// Server config /////////////////

        const PORT = 3000
        const connectedServer = httpServer.listen(PORT, () => {
            console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
        })
        connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
        