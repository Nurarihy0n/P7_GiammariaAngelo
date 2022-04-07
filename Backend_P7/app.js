const express = require('express');
//plugin securite
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

//connection aux routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentaireRoutes = require('./routes/commentaire');

//plugin express-rate-limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100 //Limite chaque adresse IP a 100 requete par fenetre
});

const app = express();
app.use(helmet());
app.use(limiter);

//Erreur CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
 });

 app.use(express.json());
 app.use('/images', express.static(path.join(__dirname, 'images')));
 app.use('/api/post', postRoutes);
 app.use('/api/post', commentaireRoutes);
 app.use('/api/auth', userRoutes);



module.exports = app;