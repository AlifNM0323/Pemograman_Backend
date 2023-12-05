let fruits = require('../models/data.js')

let fruitController = {}

fruitController.index = () => {
    for (const fruit of fruits) {
        console.log(fruit)
    }
}

fruitController.store = (data) => {
    fruits.push(data)
    fruitController.index();
}

fruitController.update = (index,data) => {
    fruits[index] = data
    fruitController.index();
}

fruitController.destroy = (index) => {
    fruits.splice(index,1)
    fruitController.index();
}

module.exports = fruitController