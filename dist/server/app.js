const configs = require('./config.js');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwtExpress = require('./_helpers/jwt');
const jwt = require('jsonwebtoken');
const errorHandler = require('./error-handler');
const keys = require('./_helpers/keys.json');
const calls = require('./calls.js');

//librerias para subir archivos 
const multipart = require('connect-multiparty');
/*-----------comando  para instala  npm i connect-multiparty---------------------------------*/

const app = express();
// users hardcoded for simplicity, store in a db for production applications
const usersHarcoded = [
    {
        idUsuario: 1,
        matricula: '123',
        nombre: 'Brian Alejandro Ochoa Duran',
        fechaNacimiento: '2002 - 02 - 16T06: 00: 00.000Z',
        correo: 'brian16ochoa@admin.com',
        telefono: '3310800159',
        descripcion: 'Shoot your shot',
        contrasena: 'brian123',
        fotoUrl: '',
        tipo: 'Administrador',
        fechaCreacion: '2019 - 08 - 03T05: 27: 42.000Z',
        fechaModificacion: '2019 - 08 - 03T05: 27: 42.000Z'
    },
    {
        idUsuario: 2,
        matricula: '321',
        nombre: 'Brian Alejandro Ochoa Duran',
        fechaNacimiento: '2002 - 02 - 16T06: 00: 00.000Z',
        correo: 'brian16ochoa@admin.com',
        telefono: '3310800159',
        descripcion: 'Shoot your shot',
        contrasena: 'brian123',
        fotoUrl: '',
        tipo: 'Alumno',
        fechaCreacion: '2019 - 08 - 03T05: 27: 42.000Z',
        fechaModificacion: '2019 - 08 - 03T05: 27: 42.000Z'
    },
    {
        idUsuario: 3,
        matricula: '456',
        nombre: 'Brian Alejandro Ochoa Duran',
        fechaNacimiento: '2002 - 02 - 16T06: 00: 00.000Z',
        correo: 'brian16ochoa@admin.com',
        telefono: '3310800159',
        descripcion: 'Shoot your shot',
        contrasena: 'brian123',
        fotoUrl: '',
        tipo: 'Maestro',
        fechaCreacion: '2019 - 08 - 03T05: 27: 42.000Z',
        fechaModificacion: '2019 - 08 - 03T05: 27: 42.000Z'
    }
];

/*-------------GENERAL CONFIGS-------------*/
app.set('port', process.env.PORT || configs.port);
app.use(morgan('dev')); //View calls on dev
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,content-type, accept');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

/*
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, x-access-token, Content-Type, Accept");
    next();
});*/
//app.use(jwtExpress());
//INIT SERVER
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

/*-------------------CALLS------------------*/
///DATA FOR MENU OF QUERYS IN HOME
/*PARAMS:
    WHITOUT PARAMS
*/
app.get('/api/getAlmacen', (req, res) => {
    calls.getAlmacen().then(resp => {
        res.send(resp);
        return resp;
    }).catch(e => console.log(e));
});


/*-------------LOGIN AND SESSION PROCESS-------------*/
// routes
app.post('/users/authenticate', authenticate);
// functions
function authenticate(req, res, next) {
    authenticateS(req.body)
        .then(usuario => usuario ? res.json(usuario) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}
//AUTHENTIFICATE 
async function authenticateS({ username, password }) {
    //GET ALL USERS ON TABLE
    /*const users = await calls.getUsuarios().then(resp => {
        return resp.data;
    }).catch(e => console.log(e));*/
    //FIND USER
    const user = usersHarcoded.find(u => u.matricula === username && u.contrasena === password);
    if (user) {
        //CREATE TOKEN WITH IDUSUARIO
        const token = jwt.sign({ sub: user.idUsuario }, keys.secret);
        const { contrasena, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }

}
// global error handler
app.use(errorHandler);


/*-------------LOGON AND REGISTER PROCESS-------------*/

/*-------------------upload functions------------------*/
const multipartMiddleware = multipart({
    uploadDir: './uploads'
});

app.post('/api/upload', multipartMiddleware, (req, res, next) => {
    res.json({
        'message': 'File uploaded succesfully.'
    });
});

/*-------------------ROOT ANGULAR APLICATION------------------*/
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname));
});
app.get('/login', jwtExpress(), (req, res) => {
    res.sendFile(__dirname + '/siie/index.html');
});
app.get('/schedule', (req, res) => {
    res.sendFile(__dirname + '/siie/index.html');
});
app.get('/profile', (req, res) => {
    res.sendFile(__dirname + '/siie/index.html');
});
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/siie/index.html');
});
app.use('/', express.static(__dirname + '/siie'));