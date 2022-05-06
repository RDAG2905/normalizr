
const {faker} =  require('@faker-js/faker')
faker.locale = 'es'

class DaoFaker{

    constructor(cantidad){
        this.cantidad = cantidad
    }

    generateProducts(){ 
        let elements = []
        for (let index = 0; index < this.cantidad; index++) {
            let name = faker.commerce.productName()
            let price = faker.commerce.price()
            let image = faker.image.business()
            
            let product = {
                nombre : name,
                precio : price,
                fotoUrl : image
            }
           
           elements.push(product)
        }   
        return elements  
    }
}

module.exports = DaoFaker