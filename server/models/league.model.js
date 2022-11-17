const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const LeagueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "League name is required"]
    },   
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref:"User"
    }],
    commissioner: {
        type: Schema.Types.ObjectId,
        ref:"User"
    }
    //weeks is going to be an object where the keys are the week number and the values is an array of the objects containing userId and picks for that week
    //weeks: {
    //     1: [{userid: id, picks}, ....]
    //     2: [{userid: id, picks}, ....]
    // }
    // weeks: {
    //     type: Object
    // }
}, { timestamps: true });

LeagueSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

LeagueSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

LeagueSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports.League = mongoose.model('League', LeagueSchema);