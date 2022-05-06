
const express = require('express')
const daoMensajes = require('./Dao/DaoMensajes')
const util = require('util')
const normalizr = require('normalizr')
const normalize = normalizr.normalize
const schema = normalizr.schema

const routerProductos = require('./Rutas/RouterProductos')

const { Server: HttpServer, ServerResponse } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
const handlebars = require('express-handlebars')    
const { header } = require('express/lib/response')
app.engine(
    "hbs",
    handlebars.engine({
        etname: ".hbs",
        defaultLayout : "layout.hbs",
        layoutsDir: __dirname + "/public/layouts",
        partialsDir: __dirname + "/public/plantillas"
    })
)

app.set("views","./public/plantillas")
app.set("view engine","hbs")
app.use('/api',routerProductos)

const autorSchema = new schema.Entity('autor')
const publicacionSchema = new schema.Entity('publicacion')
//const autorSchema = new schema.Entity('autor',{},{idAttribute: 'email'})
//const publicacionSchema = new schema.Entity('publicaciones')

/*const mensajeSchema = new schema.Entity('mensajes',
{},{idAttribute: 'email'}
  )*/

const mensajeSchema = new schema.Entity('mensajes',{
  autor : [autorSchema],
  publicacion : [publicacionSchema]
})

/*const chatSchema = new schema.Entity('chats',{
 chats:[mensajeSchema]
})*/

const chatSchema = new schema.Values(mensajeSchema)

    io.on('connection', async (socket) => {  
            let dao = new daoMensajes()                                  
            let mensajes = dao.getAll()
                                .then(()=> {   
                                             
                                    socket.emit(mensajes)       
                                })                                                                     
                                .catch((error)=>console.log(error))
                               //.finally(()=>dao.disconnect())
        
        socket.on('chateando',async (chat)=>{   
            //console.log(`chat: ${util.inspect(chat,false,12,true)}`)      
              dao.save(chat)
                        .then(id => 
                            dao.getAll()
                                    .then(chats => {  
                                        //console.log(`chats : ${util.inspect(chats,false,12,true)}`)
                                        const normalizado = normalize(chats,chatSchema)
                                        console.log(`normalizado : ${util.inspect(normalizado,false,12,true)}`)  
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
        