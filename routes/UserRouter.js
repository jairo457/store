const { User } = require('../models/User');
const express = require('express');
const router = express.Router();
//const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserController = require('../controllers/UserController')
//var guard = require('express-jwt-permissions')()
//var guard = require('express-jwt-permissions')({
/*    requestProperty: 'auth',
    permissionsProperty: 'scope'
  })*/
// ,guard.check('user:read')
router.get('/', UserController.findAll)

router.get('/:id', UserController.findById)

router.put('/:id', UserController.update)

router.post('/register', UserController.save)

router.delete('/:id', UserController.delete_user)


router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    const secret = process.env.SECRET;
    if (!user) {
        return res.status(400).send('User not found.');
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin,
                /*permissions: [
                    //"user:admin",
                    "user:read",
                    "user:write"
                ]*/
            },
            secret,
            { expiresIn: '1d' }
        )

        res.status(200).send({ user: user.email, token: token })
    } else {
        res.status(400).send('Password is wrong!');
    }
})

router.get(`/get/count`, async (req, res) => {
    const userCount = await User.countDocuments((count) => count)

    if (!userCount) {
        res.status(500).json({ success: false })
    }
    res.send({
        userCount: userCount
    });
})


module.exports = router;