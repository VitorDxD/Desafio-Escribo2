const jwt = require('jsonwebtoken');

function verifyJwt (req, res, next) {
    const token = req.headers.authentication.split(' ')[1];

    jwt.verify(token, process.env.SECRET, (err) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Sessão inválida' });
            } else {
                return res.status(401).json({ message: 'Não autorizado' });
            }
        }

        next();
    });
}

module.exports = verifyJwt;