
const UserController = require('../controllers/user.controller');

const { authenticate } = require('../config/jwt.config');

module.exports = function(app){
    app.post('/api/users/new', UserController.createUser);
    app.get('/api/users/getloggedinuser', authenticate, UserController.getLoggedInUser);
    app.get('/api/users/logout', authenticate, UserController.logout);
    app.post('/api/users/login', UserController.login);
    app.get("/api/users", UserController.findAllUsers);
    app.put("/api/users/:id", UserController.updateUser)
    app.delete("/api/users/:id", UserController.deleteUser)

}

// }


