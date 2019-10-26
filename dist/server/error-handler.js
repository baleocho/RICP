module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.sendFile(__dirname + '/siie/index.html');
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
}