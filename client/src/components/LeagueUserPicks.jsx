import axios from 'axios';
import React, { useState, useEffect } from 'react'
import WeekLiveResults from './WeekLiveResults';
import WeekStandings from './WeekStandings';
import { Link, useNavigate } from "react-router-dom"
import './teams.css'


const LeagueUserPicks = (props) => {
    const { leagueID } = props
    const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    const [leagues, setLeagues] = useState([])
    const navigate = useNavigate()
    const [week, setWeek] = useState(1)
    const [user, setUser] = useState({})
    const [usersWhoMadePicks, setUsersWhoMadePicks] = useState([])
    const [picksExists, setPicksExist] = useState(false)
    const [league, setLeague] = useState({})
    const [usersFromLeague, setUsersFromLeague] = useState([])
    const [liveWinners, setLiveWinners] = useState({})
    const [isCommissioner, setIsCommissioner] = useState(false)

    useEffect(() => {

        setPicksExist(false)
        let pickers = []

        axios.get(`http://localhost:8000/api/leagues/${leagueID}`, { withCredentials: true })
            .then(res => {
                let currUsers = res.data[0].users
                setLeague(res.data[0])
                setUsersFromLeague([...currUsers])
                for (let user of currUsers) {
                    if (user.hasOwnProperty("picks") && user.picks.hasOwnProperty(leagueID) && user.picks[leagueID].hasOwnProperty(week)) {
                        pickers.push({ ...user, pointsEarned: 0 })
                        setPicksExist(true)
                    }
                }
                setUsersWhoMadePicks([...pickers])
                for (let user of pickers) {
                    user.picks[leagueID][week].forEach(game => {
                        if (liveWinners[game.gameID].winner === game.winner) {
                            user.pointsEarned += game.points
                        }

                    }
                    )
                }

                setUsersWhoMadePicks([...pickers])
            })
            .catch(err => console.log(err))


        axios.get(`http://localhost:8000/api/users/getloggedinuser`, { withCredentials: true })
            .then(res => {
                setUser(res.data.results)
                setLeagues(res.data.results.leagues)

            })
            .catch(err => console.log(err))
        
        if (user._id && user._id === league.commissioner) {
            setIsCommissioner(true)
        }



    }, [week, leagueID, liveWinners])



    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/users/getloggedinuser`, { withCredentials: true })
    //         .then(res => {
    //             setUser(res.data.results)
    //             setLeagues(res.data.results.leagues)

    //         })
    //         .catch(err => console.log(err))

    //     if (user._id === league.commissioner) {
    //         console.log(user._id)
    //         console.log(league.commissioner)
    //         console.log(league.commissioner)
    //         setIsCommissioner(true)
    //     }

    // }, [])

    const handleLiveWinners = (winners) => {
        setLiveWinners({ ...winners })
    }



    return (

        <div>
            <div className='flex items-center justify-center flex-col mb-10'>
                <h1 className='text-center text-5xl  font-bold '>{league.name}</h1>
                {isCommissioner ? <Link to={`/leagues/${leagueID}/edit`} className="text-indigo-300 ">Edit League</Link> : ""}
            </div>
            <h1 className='text-center text-xl mx-auto'> Week
                <select name="weekNumber" onChange={(e) => { setWeek(e.target.value); setPicksExist(false) }}>
                    {weeks.map(weekNumber => <option value={weekNumber}>{weekNumber}</option>)}
                </select>
            </h1>
            <WeekLiveResults week={week} handleLiveWinners={handleLiveWinners} />
            < WeekStandings users={usersWhoMadePicks} />
            {!picksExists ?
                <>
                    <h1 className='text-center my-5 text-2xl'>No User Has Made Picks for Week {week}</h1>
                </>
                :

                <div className='mx-auto  text-center flex justify-around flex-wrap lg:flex-nowrap   my-3'>
                    {usersWhoMadePicks.map(user =>
                        <>
                            <div className='flex-col justify-start border-2 rounded-md w-full md:basis-1/2 lg:basis-1/4 my-5'>
                                <p className="p-1  w-full font-bold bg-slate-500 text-white">{user.firstName}</p>
                                <p className="p-1  w-full font-bold bg-slate-200">Score: {user.pointsEarned}</p>
                                {user.picks[leagueID][week].map(team =>
                                    <>
                                        <div className={`flex justify-between [&>*]:mx-5 even:bg-slate-200 w-full font-bold ${liveWinners[team.gameID].winner === team.winner ? "text-green-400" : "text-red-400"}  ${liveWinners[team.gameID].status === "Not Played" ? "text-black" : ""}`}>
                                            <p >{team.winner}</p>
                                            <p > {team.points}</p>
                                        </div>
                                    </>)}
                            </div>
                        </>

                    )}
                </div>
            }
        </div>

    )
}

export default LeagueUserPicks