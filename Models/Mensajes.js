const mongoose = require('mongoose');
const { DATE } = require('mysql/lib/protocol/constants/types');

const mensajesCollection = 'Mensajes';



const publicacionSchema = new mongoose.Schema({
    fechayHora: {type: Date,default: Date.now},
    texto: {type: String},
    id: {type: String,max: 50}
});


const autorSchema = new mongoose.Schema({
    id: {type: String,max: 50},
    nombre: {type: String,max: 50},
    apellido: {type: String, max: 100},
    edad: {type: Number},
    alias: {type: String},
    avatar: {type: String, max: 100} 
})


const mensajeSchema = new mongoose.Schema({
    id: {type: String,max: 50},
    autor: autorSchema,
    publicacion : publicacionSchema
})

/* 
const mensajeSchema = new mongoose.Schema({
    autor: autorSchema,
    texto : {type: String, max: 100},
    fechayHora: {type: Date,default: Date.now}
})
*/

module.exports = mongoose.model(mensajesCollection, mensajeSchema);
