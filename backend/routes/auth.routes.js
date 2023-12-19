const Router = require('express');
const User = require('../models/User');
const config = require('config');
const router = new Router;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Project = require('../models/Project')
const {check, validationResult} = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/registration',
    [
        check('username', 'Incorrect username').isLength({ min: 2 }),
        check('password', 'Incorrect password').isLength({ min: 2, max: 15 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Incorrect request', errors });
            }
            const { username, password } = req.body;

            // Check if the username already exists
            const existingUser = await User.findOne({ username });

            if (existingUser) {
                // Send a specific response for duplicate username
                return res.status(401).json({ message: `Username '${username}' is already taken` });
            }

            const hashPassword = await bcrypt.hash(password, 8);
            const user = new User({ username, password: hashPassword });
            await user.save();
            return res.json({ message: "User was created" });

        } catch (e) {
            console.error(e);

            // Check if the error is a duplicate key error
            if (e.code === 11000) {
                return res.status(402).json({ message: 'Username is already taken' });
            }

            res.status(500).json({ message: 'Server error' });
        }
    });



router.post('/login',
    async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const isPassValid = bcrypt.compareSync(password, user.password);

            if (!isPassValid) {
                return res.status(400).json({ message: "Incorrect password" });
            }

            const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });

            return res.json({
                id: user.id,
                username: user.username,
                token,
            });
        } catch (e) {
            console.error(e);
            res.send({ message: 'Server error' });
        }
    });


router.get('/auth', authMiddleware,
    async  (req, res) => {

        try {
            const user = await User.findOne({_id: req.user.id});
            const token = jwt.sign({id: req.user.id}, config.get('secretKey'), {expiresIn: '1h'});
            return res.json({
                id: user.id,
                username: user.username,
                token: token

            })
        } catch (e) {
            console.error(e);
            res.send({message: 'Server error'})
        }
    });

module.exports = router;
