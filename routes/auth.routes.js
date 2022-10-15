const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = new Router();

router.post('/registration', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const candidate = await User.findOne({ email });

        if (candidate) {
            return res.status(400).json({ message: `User with email ${email} already exist` })
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const user = new User({ name, email, password: hashPassword })
        await user.save();
        return res.json({
            message: 'user was created',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
            }
        })
    } catch (error) {
        console.log(error);

        res.send({ message: 'Server error' })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPassValid = bcrypt.compareSync(password, user.password);
        if (!isPassValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ id: user.id }, 'secret-key', { expiresIn: '1h' });
        return res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
            }
        })
    } catch (error) {
        console.log(error);

        res.send({ message: 'Server error' })
    }
})

router.put('/profile', async (req, res) => {
    try {
        const { email, name, image } = req.body;
        await User.updateOne({ email }, {$set: {name, image}});
        const user = await User.findOne({ email });
        return res.json({
                message: 'Info changed',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                }
            })
    } catch (error) {
        console.log(error);

        res.send({ message: 'Server error' })
    }
})
router.post('/getUser', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        return res.json({
                message: 'user founded',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    lang: user.lang,
                }
            })
    } catch (error) {
        console.log(error);

        res.send({ message: 'Server error' })
    }
})

router.put('/lang', async (req, res) => {
    try {
        const { email, lang } = req.body;
        await User.updateOne({ email }, {$set: {lang}});
        const user = await User.findOne({ email });
        return res.json({
                message: 'Info changed',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    lang: user.lang,
                }
            })
    } catch (error) {
        console.log(error);

        res.send({ message: 'Server error' })
    }
})


module.exports = router;
