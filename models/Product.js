const mongoose = require('mongoose')
const Category = require('./Category')

const productSchema = mongoose.Schema({
    id:       { type: Number, required: false },
    name:     { type: String, required: true },
    price:    { type: Number, required: true },
    color:    { type: String, required: true },
    size:     { 
                type: String, 
                enum: { values: ['S', 'M', 'L', 'XL', 'XS', '2XL', '3XL'], message: '{VALUE} is not supported' },
                required: true 
    },
    quantity: { type: Number, required: true, min: 0, max: 1000 },
    image:    { type: [String], required: false },
    category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Category',
                require: mongoose.rusted
    }
}, { collection: 'product' } )

const Product = mongoose.model('Product', productSchema)

module.exports = Product