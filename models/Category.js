const mongoose = require('mongoose')
const categorySchema = mongoose.Schema({
    id:   { type: Number, required: true },
    name: { type: String, required:true, max:100 }
}, { collection: 'category' })

const Category = mongoose.model('Category', categorySchema)

module.exports = Category