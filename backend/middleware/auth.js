const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
secret = process.env.TOKEN_SECRET
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, secret);
        const userId = decodedToken.userId;
        req.auth = { userId: userId };
        next();
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
}