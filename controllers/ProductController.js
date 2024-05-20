const express = require('express')
const app = express()
const Product = require('../models/Product')
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')

const findAll = async (req, res) => {
    try {
        const products = await Product.find().populate('category')
        res.send(products)
    } catch (error) {
        console.log(error)

    }
}

const findById = async (req, res) => {
    try {
        const products = await Product.find({ 'id': req.params.product_id }).populate('category')
        res.json(products)
    } catch (error) {
        res.status(500).send({ "status": false, "message": "Error while fetching information..." })
        console.log(error)
    }
}

const save = async (req, res) => {
    try {
        let objNewProduct = req.body
        /*let totalProducts = await Product.count({});
        objNewProduct.id = totalProducts++*/
        const p = await Product.find().sort({ "id": -1 }).limit(1)
        objNewProduct.id = parseInt(p[0].id) + 1

        objNewProduct.category = new mongoose.Types.ObjectId(req.body.category)
        const product = new Product(objNewProduct)
        let savedProduct = await product.save()
        res.send(savedProduct)

    } catch (error) {
        //console.log(error)
        res.status(400).send(error.errors)
    }
}

const update = async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate({ "id": parseInt(req.body.id) },
            {
                name: req.body.name,
                price: req.body.price,
                color: req.body.color,
                size: req.body.size,
                quantity: req.body.quantity,
                image: req.body.image,
                category: new mongoose.Types.ObjectId(req.body.category)

            }, { new: true, upsert: true, runValidators: true })
        res.send(updatedProduct)
    } catch (error) {
        //console.log(error)
        res.status(400).send(error.errors)
    }
}

const patch = async (req, res) => {

    try {
        const patchedProduct = await Product.findOneAndUpdate({ "id": parseInt(req.body.id) }, req.body, { new: true, runValidators: true })
        res.send(patchedProduct)
    } catch (error) {
        //console.log(error)
        res.status(400).send(error.errors)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const docDeleted = await Product.findOneAndDelete({ "id": parseInt(req.params.id) })
        if (docDeleted) {
            res.status(200).json({ code: 200, message: 'Product deleted', deletedProduct: docDeleted })
            //res.send(docDeleted)
        }
        else res.status(500).send("Product not found...(" + req.params.id + ")")
    } catch (error) {
        console.log(error)
    }
}

module.exports = { findAll, findById, save, update, patch, deleteProduct}

