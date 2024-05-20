const express = require('express')
const ProductController = require('../controllers/ProductController')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router()

/*router.get('/products', async (req, res) => {

    try {
        const products = await Product.find().populate('category')
        res.send(products)
        
    } catch (error) {
        console.log(error)

    }

})*/

router.get('/products', ProductController.findAll)
router.post('/products', ProductController.save)
router.put('/products', ProductController.update)
router.patch('/products', ProductController.patch)
router.delete('/products/:id', ProductController.deleteProduct)


module.exports = router