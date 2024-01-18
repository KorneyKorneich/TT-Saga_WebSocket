const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, config.get('secretKey'));

        req.user = decoded;
        console.log(decoded)
        next();
    } catch (e) {
        //TODO: Тут ошибка, разобраться. Что-то с токеном?
        console.error('Error verifying token:', e);
        return res.status(401).json({ message: 'Invalid token.' });
    }
};
