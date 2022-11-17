
const LeagueController = require('../controllers/league.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app){

    app.post('/api/leagues/new', LeagueController.createLeague);
    app.get("/api/leagues", LeagueController.findAllLeagues);
    app.put("/api/leagues/adduser/:id", authenticate, LeagueController.addUserToNewLeague);
    app.put("/api/users/addleague/:id", authenticate, LeagueController.addUserToExistingLeague);
    app.put("/api/leagues/:id", LeagueController.updateLeague)
    app.get("/api/leagues/:id", LeagueController.getLeague)
    app.delete("/api/leagues/:id", LeagueController.deleteLeague)
}
