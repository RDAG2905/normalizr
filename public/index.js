
/*const normalizr  = require("normalizr")
const normalize = normalizr.normalize
const denormalize = normalizr.denormalize
const schema = normalizr.schema*/ 

//const { schema } = require("../models/Mensajes")

const socket = io.connect()

const Enviar = ()=>{
   let nombre = document.querySelector('#nombre').value
   let precio = document.querySelector('#precio').value
   let fotoUrl = document.querySelector('#fotoUrl').value

   let valores = {
   nombre: nombre,
   precio: precio,
   fotoUrl: fotoUrl
   }

   socket.emit('addProduct',valores)
 }



const renderProducts = (productos) =>{
    const temphbs = document.querySelector("#lista").innerHTML
    const template = Handlebars.compile(temphbs)
    console.log(template)
    document.querySelector('#lista').innerHTML = template({productos}); 
  }


   
  socket.on('productos',data => {
   renderTable(data)
 });



 function renderTable(productos) {
    return fetch('plantillas/tabla.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            document.querySelector('#lista').innerHTML = html
        })
}
 

function makeHtmlList(mensajes) {
 console.log(mensajes)
  const divMensajes = document.querySelector('#mensajes')
  let lista = []
  
   mensajes.forEach(mensaje => {
      let msg = (`
          <tr style='width:350px;height:30px;'>
              <td style="color:blue;width:50px;">${mensaje.autor.id}</td>
              <td style="color:brown;width:50px;text-align:left">[${mensaje.fechayHora}]:</td>
              <td style="color:green;text-align:left">${mensaje.texto}</td>
          </tr>
      `)
      msg.replace(',','')
      lista.push(msg)
  })
  divMensajes.innerHTML = lista
}



socket.on('mensajes',data=>{
  makeHtmlList(data)
})




const enviarChat=()=>{
  let mensaje = document.querySelector("#inputMensaje").value
  let email = document.querySelector("#emailAutor").value
  let nombre = document.querySelector("#nombreAutor").value
  let apellido = document.querySelector("#apellidoAutor").value
  let edad = document.querySelector("#edadAutor").value
  let alias = document.querySelector("#aliasAutor").value
  let avatar = document.querySelector("#avatarAutor").value
 
  let autor = {
    id:email,
    nombre:nombre,
    apellido:apellido,
    edad:edad,
    alias:alias,
    avatar:avatar
  }
 
  let chat = {
      autor:autor,
      texto:mensaje
  }
  
  socket.emit("chateando",chat)
}
 


function isValidEmail(mail) { 
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail); 
}


function isValidInput(input){
 return input.length > 0
}


const verificar = ()=>{
  let valor = document.querySelector('#emailAutor').value
  let cartel = document.querySelector('#showAlert')
  let inputMensaje = document.querySelector('#inputMensaje')
  let btnEnviar = document.querySelector('#btnEnviar')
  if(isValidEmail(valor) ){
    cartel.style.display = 'none'  
    inputMensaje.disabled = false
    btnEnviar.disabled = false
  }else{
    cartel.style.display = 'block'
    inputMensaje.disabled = true
    btnEnviar.disabled = true
  }
  
}

const showError= ()=> {}
const hideError= ()=> {}
  

const validarMensaje = ()=>{
  let inputMensaje = document.querySelector('#inputMensaje')
  if(isValidInput(inputMensaje.value)){
    btnEnviar.disabled = false
  }else{
    btnEnviar.disabled = true
  }
}
