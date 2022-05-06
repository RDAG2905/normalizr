

    module.exports={
       
        server: {
            "port": 8080
        },
        mongoDB: {
            "connection": 'mongodb://localhost:27017/chat'         
        },
        tipoPersistencia:{
            "persistenciaA":'productoMongo',
            'persistenciaB':'carritoMongo',
            'persistenciaC':'productoSql',
            'persistenciaD':'carritoSql'
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
              database : 'ecommerce2'
            }
                     
        }
        
    }

    