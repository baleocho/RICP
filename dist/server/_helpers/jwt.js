const expressJwt = require('express-jwt');
const keys = require('./keys.json');

module.exports = jwtExpress;

function jwtExpress() {
    const { secret } = keys;
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/login',
            '/homePrueba',
            '/'
        ]
    });
}
