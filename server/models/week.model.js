const mongoose = require('mongoose');
const WeekSchema = new mongoose.Schema({
    weekNumber: { type: Number },
    games: { type: Array }
}, { timestamps: true });
module.exports.Week = mongoose.model('Week', WeekSchema);

