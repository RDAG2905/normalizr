const CarritosDaoMongoDB = require("../Dao/CarritosDaoMongoDB");
const ProductosDaoMongoDB = require("../Dao/ProductosDaoMongoDB");

    module.exports={
       
        server: {
            "port": process.env.port
        },
        mongoDB: {
            "connection": 'mongodb://localhost:27017/ecommerceProductiva'         
        },
        tipoPersistencia:{
            'carrito': new CarritosDaoMongoDB(),
            'productos': new ProductosDaoMongoDB() 
        },
        
            optionsSqlLite3 : {
            client: 'sqlite3', 
            connection: {
              filename: "./DB/mydb.sqlite"
            },
            useNullAsDefault : true
        },
            optionsMySql : {
            client: 'mysql',
            connection: {
              host : '127.0.0.1',
              port : 3306,
              user : 'root',
              password : '',
              database : 'ecommerce'
            }
        }
        
    }

    