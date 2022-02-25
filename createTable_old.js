const knex = require('./mySql')


const articulos = [
  {
    nombre:"articulo 1",
    codigo:"002",
    precio:"24000",
    stock:"12"
  },
  {
    nombre:"articulo 2",
    codigo:"001",
    precio:"15000",
    stock:"5"
  },
  {
    nombre:"articulo 3",
    codigo:"003",
    precio:"25000",
    stock:"8"
  },
  {
    nombre:"articulo 4",
    codigo:"004",
    precio:"5000",
    stock:"4"
  },
  {
    nombre:"articulo 5",
    codigo:"005",
    precio:"6300",
    stock:"71"
  }
]

knex.schema.dropTableIfExists('articulos')
.then(()=>{
return knex.schema.createTable('articulos', table => {
      table.increments();
      table.string('nombre');
      table.string('codigo');
      table.float('precio');
      table.integer('stock');
    })

  })
  .then(()=>{
    console.log("Tabla creada");
    return knex('articulos').insert(articulos)
  }) 
  .then(()=>{
    console.log("Registros creados");
    return knex('articulos')
  }) 
  .then((rows)=>{
   for (const row of rows) {
     console.log(row)
   }
    return knex('articulos').where("id",2).update("stock",0)
  }) 
  .then(()=>{
    return knex('articulos').where("id",3).del()
  })
  .catch((err)=>
  {
    console.log(err.sqlMessage)
    console.log(err.sql)
  })
  .finally(()=> knex.destroy())