const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    //Checks is token passed in header is valid and sets it to req.header id valid
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }

}