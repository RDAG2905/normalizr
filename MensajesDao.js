const fs = require('fs')

class MensajesDAO{

    constructor(fileName){
        this.fileName =  fileName
      
    }
    
    
    async save(mensaje){
        let mensajes = []
            const contenido = await this.getAll()
            if(contenido.length > 0){
                 mensajes = JSON.parse(contenido)
            }                
            
            
                if(mensajes.length == 0 ){
                    mensaje.id = 1
                
                }else{
                    let maxId = mensajes.slice(-1)[0].id
                    mensaje.id = maxId + 1
                    
                }
                mensajes.push(mensaje)  
                console.log(mensajes)
               
                      
                await fs.promises.writeFile(this.fileName,JSON.stringify(mensajes))
                return mensaje.id
          //  }else{
          //      console.error(`El mensaje ${mensaje.title} ya se encuentra en la lista `); 
          //  }   
    
    
    }
    
    
    async getById(id){
        const contenido = await this.getAll()
        const mensajes = JSON.parse(contenido)
        const resultado =  mensajes.filter(x => x.id == id)
        return resultado[0]
    }
    
    
    async getAll(){
        try{
            const contenido = await fs.promises.readFile(this.fileName,'utf-8')
            return contenido
        }catch(err){
            throw new Error(`Error al abrir el archivo: ${err}`)
        }
    }
    
    
    async deleteById(id){
        try{
            const contenido = await this.getAll()
            const mensajes = JSON.parse(contenido)
            const remanente =  mensajes.filter(x => x.id != id)
            await fs.promises.writeFile(this.fileName,JSON.stringify(remanente))
        }catch(error){
            throw new Error(`Error al Eliminar Por Id : ${error}`)
    
        }
    }
    
    
    async deleteAll(){
        await fs.promises.writeFile(this.fileName,JSON.stringify([]))
    }
    
    }
    
    module.exports = MensajesDAO