
const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}

module.exports.createUser = (request, response) => {
    User.exists({ email: request.body.email })
        .then(userExists => {
            if (userExists) {
                response.json({ message: "User already exists" })
            } else {
                User.create({ ...request.body })
                    .then(user => {
                        const userToken = jwt.sign({
                            id: user._id
                        }, process.env.SECRET_KEY)
                        response.cookie("usertoken", userToken, process.env.SECRET_KEY, { httpOnly: true })
                        response.json({ userToken })
                    }
                    )
                    .catch(err => response.status(400).json(err));

            }
        })
}



module.exports.findAllUsers = (request, response) => {
    User.find().populate("leagues")
        .then(user => response.json(user))
        .catch(err => response.json(err));
}

module.exports.getUser = (request, response) => {
    User.find({ _id: request.params.id }).populate("leagues")
        .then(user => response.json(user))
        .catch(err => response.json(err));
}


module.exports.updateUser = (request, response) => {

    const { newLeaguePicks, leagueID, weekID, weekPicks } = request.body

    let newPicks = {}
    User.find({ _id: request.params.id }).populate("leagues")
        .then(user => { 
            if (user[0].picks && user[0].picks[leagueID]) {
                newPicks[leagueID] = {...user[0].picks[leagueID], ...weekPicks}
            } else {
                newPicks = {...newLeaguePicks}
            }
            User.findOneAndUpdate({ _id: request.params.id }, { $set: { picks: newPicks } }, { new: true, runValidators: true })
                .then(updatedUser => {
                    response.json(updatedUser)
                })
                .catch(err => response.status(400).json(err))
        })
        .catch(err => response.json(err));
}

module.exports.deleteUser = (request, response) => {
    User.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

module.exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {

        // email not found in users collection
        return res.status(400).json({ msg: "User does not exist" });
    }

    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if (!correctPassword) {
        return res.status(400).json({ msg: "Wrong password" });
    }

    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);


    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, process.env.SECRET_KEY, { httpOnly: true })
        .json({ userToken });

}


// Rob turned this into a class, so you'll have to change this to module.exports.getLoggedInUser or something
module.exports.getLoggedInUser = (req, res) => {
    //use the info stored in the cookie to get the id of the logged in user and query the db to find a user with that id, and return with info about the logged in user
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true })

    // decodedJWT.payload.id, basically parse out the data from the line above
    User.findOne({ _id: decodedJWT.payload.id }).populate("leagues")
        .then(foundUser => {
            res.json({ results: foundUser })
        })
        .catch(err => {
            res.json(err)
        })
}



module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}



