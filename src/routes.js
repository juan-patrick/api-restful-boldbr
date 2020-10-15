const routes = require('express').Router();

const UserController = require('./controllers/UserController');
const SignController = require('./controllers/SignController');

const { SingIn, SingUp } = require('./middlewares/Validation');
const Auth = require('./middlewares/Auth');

routes.post('/sign-in', SingIn, SignController.store);
routes.post('/users', SingUp, UserController.store);

routes.use(Auth);

routes.get('/users/:user_id', UserController.show);

module.exports = routes;
