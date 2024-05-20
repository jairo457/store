const express = require('express')
const app = express()
const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')

const findAll = async (req, res) => {
    const users = await User.find({});
    res.send(users)
}

const findById = async (req, res) => {
    const users = await User.findById(req.params.id);
    res.send(users)
}

const save = async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();

    if (!user)
        return res.status(400).send('The user cannot be created!')

    res.send(user);
}

const update = async (req, res) => {
    const userExist = await User.findById(req.params.id);
    let newPassword
    if (req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.passwordHash;
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        },
        { new: true }
    )

    if (!user)
        return res.status(400).send('The user cannot be created!')

    res.send(user);
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

const delete_user = async (req, res) => {
    User.findByIdAndDelete(req.params.id).then(user =>{
        if(user) {
            return res.status(200).json({success: true, message: 'the user is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "user not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
}

module.exports = { findAll, findById, save, update, patch, delete_user }

