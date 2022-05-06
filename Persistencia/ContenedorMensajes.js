const mongoose = require('mongoose');
const model = require('../models/Mensajes');
const config = require('config');
const mongoConnectionString = config.get('mongoDB.connection')  
const util = require('util')

class ContenedorMensajes{

    constructor(){
        
        const URL = mongoConnectionString
        mongoose.connect(URL, {});   
        console.log('Base de datos conectada');
    }
   

    async getAll(){
        return await model.find({});
    }
     

    async getById(idProducto){
      return await model.findById(idProducto)
    }


    async save(element){
        //console.log(`element : ${util.inspect(element,false,12,true)}`)
        const saveModel = model(element);
        return await saveModel.save();
    }


    async update(elemento,idBuscado){
        return await model.findByIdAndUpdate(idBuscado,elemento)     
       
    }


    async delete(id){
        await model.findByIdAndRemove(id)
        
    }
}

module.exports = ContenedorMensajes
 