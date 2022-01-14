const jwt = require('jsonwebtoken');
require('dotenv').config();

//authentification user with token
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token, process.env.DB_TOKEN);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID !';
        } else {
            next();
        }
    } catch {
        res.status('401').json({
            error: 'Invalid request !'
        });
    }
};