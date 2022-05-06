const express = require('express')
const { Router } = express
const router = Router()
const dao = require('../Dao/DaoFaker')

router.get('/productos-test',(req,res)=>{
       let daoProducts = new dao(5)
       let productos = daoProducts.generateProducts()
       res.render("tabla",{productos: productos })
      
})








module.exports = router