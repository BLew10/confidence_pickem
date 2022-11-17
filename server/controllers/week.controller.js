
const { Week } = require('../models/week.model');
module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}
// The method below is new
module.exports.createWeek = (request, response) => {
    const { weekNumber, games } = request.body;
    Week.create({
        weekNumber,
        games
    })
        .then(week => response.json(week))
        .catch(err => response.json(err));
}


module.exports.findAllWeeks = (request, response) => {
    Week.find()
        .then(week => response.json(week))
        .catch(err => response.json(err));
}

module.exports.getWeek = (request, response) => {
    Week.find({ weekNumber: request.params.weekNumber })

        .then(week => response.json(week))
        .catch(err => response.json(err));
}





