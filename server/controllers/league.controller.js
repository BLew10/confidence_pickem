
const { League } = require('../models/league.model');
const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');


module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}

module.exports.createLeague = (request, response) => {
    console.log(request.body)
    League.exists({ name: request.body.name })
        .then(leagueExists => {
            if (leagueExists) {
                response.json({ message: "League already exists" })
            } else {
                League.create({ ...request.body })
                    .then(league => {
                        response.json({ results: league })
                    }
                    )
                    .catch(err => response.status(400).json(err));

            }
        })

}

module.exports.addUserToNewLeague = (request, response) => {
    const { userID } = request.body
        
        let picks = {}
        picks[request.params.id] = {}
        console.log(picks,"JELLO")


    League.findOneAndUpdate({ _id: request.params.id }, { $push: { users: userID } }, { new: true, useFindAndModify: false })
        .then(updatedLeague => {
            console.log(updatedLeague)
            response.json(updatedLeague)
        })
        .catch(err => response.status(400).json(err))

    User.findOneAndUpdate({ _id: userID }, { $push: { leagues: request.params.id } }, { new: true, useFindAndModify: false })
        .then(updatedLeague => {
            console.log(updatedLeague)
        })
        .catch(err => console.log(err))
    
        // let picks = {}
        // picks[request.params.id] = {}

        // User.findOneAndUpdate({ _id: userID }, { $set: { picks: picks } }, { new: true, runValidators: true })
        // .then(updatedUser => {
        //     console.log('updated')
        //     response.json(updatedUser)
        // })
        // .catch(err => response.status(400).json(err))
};

module.exports.addUserToExistingLeague = async (req, res) => {
    const league = await League.findOne({ _id: req.body.leagueID });
    const { userID } = req.body

    if (league === null) {
        console.log("League does not exist")
        return res.status(400).json({ msg: "League does not exist" });
    }
    const correctPassword = await bcrypt.compare(req.body.password, league.password);

    if (!correctPassword) {
        console.log("Wrong Password")
        return res.status(400).json({ msg: "Wrong password" });
    }

    const userInLeague = await League.exists({_id: req.params.id, users: { $in: [userID] } });
    console.log(req.params.id )

        if (userInLeague) {
            console.log("You are already in this league")
            res.json({ message: "You are already in this league" })
        } else {
            console.log("Added to the league")
            League.findOneAndUpdate({ _id: req.params.id  }, { $push: { users: userID } }, { new: true, useFindAndModify: false })
                .then(updatedLeague => {
                    res.json(updatedLeague, "User has been added to league")
                })
                .catch(err => res.status(400).json(err))

            User.findOneAndUpdate({ _id: userID }, { $push: { leagues: req.params.id } }, { new: true, useFindAndModify: false })
                .then(updatedLeague => {
                    console.log(updatedLeague,"League has been added to user")
                })
                .catch(err => console.log(err))
        }



}


module.exports.findAllLeagues = (request, response) => {
    League.find().populate("users")
        .then(league => response.json(league))
        .catch(err => response.json(err));
}

module.exports.getLeague = (request, response) => {
    League.find({ _id: request.params.id }).populate("users")
        .then(league => response.json(league))
        .catch(err => response.json(err));
}

module.exports.updateLeague = (request, response) => {
    League.findOneAndUpdate({ _id: request.params.id }, { ...request.body }, { new: true, runValidators: true })
        .then(updatedLeague => response.json(updatedLeague))
        .catch(err => response.status(400).json(err))
}

module.exports.deleteLeague = (request, response) => {
    League.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}




