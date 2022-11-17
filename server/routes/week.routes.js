const  WeekController = require('../controllers/week.controller');
const UserController = require('../controllers/user.controller');
const LeagueController = require('../controllers/league.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app){
    app.get('/api', WeekController.index);
    app.post('/api/weeks/new', WeekController.createWeek);
    app.get("/api/weeks", authenticate, WeekController.findAllWeeks)
    app.get("/api/weeks/:weekNumber", authenticate, WeekController.getWeek)

    app.post('/api/users/new', UserController.createUser);
    app.get('/api/users/getloggedinuser', authenticate, UserController.getLoggedInUser);
    app.get('/api/users/logout', authenticate, UserController.logout);
    app.post('/api/users/login', UserController.login);
    app.get("/api/users", UserController.findAllUsers);
    app.put("/api/users/:id", UserController.updateUser)
    app.delete("/api/users/:id", UserController.deleteUser)

    app.post('/api/leagues/new', LeagueController.createLeague);
    app.get("/api/leagues", LeagueController.findAllLeagues);
    app.put("/api/leagues/:id", LeagueController.updateLeague)
    app.delete("/api/leagues/:id", LeagueController.deleteLeague)
}

