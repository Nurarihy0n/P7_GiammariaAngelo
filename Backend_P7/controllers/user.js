const User = require("../models/User");
//plugin de securite
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

//Creation of user
exports.signup = (req, res, next) => {
    console.log(req.body.password);
    //Hash password
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'User created !'}))
        .catch( error => res.status(400).json({ error }));
    })
    .catch( error => res.status(500).json({ error }));
};

//connection user already exist
exports.login = (req, res, next) => {
    console.log(req.body.email);
    User.findOne({ where: { email: req.body.email }})
    .then(user => {
        if(!user) {
            return res.status(401).json({ error: 'User not find !'});
        }
        console.log(req.body.email)
        console.log(req.body.password);
        console.log(user);
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error: 'Wrong password !'});
            }
             return res.status(200).json({
                userId: user.userId,
                token: jwt.sign(
                    { userId: user.userId },
                    process.env.DB_TOKEN,
                    { expiresIn: '24h' }
                )
            });
        })
    })
    .catch( error => res.status(500).json({ error }));
};