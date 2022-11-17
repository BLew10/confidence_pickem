const  WeekController = require('../controllers/week.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app){
    app.get('/api', WeekController.index);
    app.post('/api/weeks/new', WeekController.createWeek);
    app.get("/api/weeks", authenticate, WeekController.findAllWeeks)
    app.get("/api/weeks/:weekNumber", authenticate, WeekController.getWeek)
}

