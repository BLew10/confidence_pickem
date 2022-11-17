import axios from 'axios';
import React, { useState, useEffect } from 'react'
import WeekLiveResults from './WeekLiveResults';
import WeekStandings from './WeekStandings';
import { Link, useNavigate } from "react-router-dom"
import './teams.css'
import { useWeek } from '../context/CurrentWeek';


const LeagueUserPicks = (props) => {
    const { leagueID } = props
    const currentWeek = useWeek()
    const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    const [leagues, setLeagues] = useState([])
    const navigate = useNavigate()
    const [week, setWeek] = useState(1)
    const [user, setUser] = useState({})
    const [usersWhoMadePicks, setUsersWhoMadePicks] = useState([])
    const [picksExists, setPicksExist] = useState(false)
    const [league, setLeague] = useState({})
    const [usersFromLeague, setUsersFromLeague] = useState([])
    const [liveWinners, setLiveWinners] = useState(null)
    const [isCommissioner, setIsCommissioner] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {

        setPicksExist(false)
        let pickers = []

        axios.get(`http://localhost:8000/api/leagues/${leagueID}`, { withCredentials: true })
            .then(res => {
                let currUsers = res.data[0].users
                setLeague(res.data[0])
                console.log(league)
                setUsersFromLeague([...currUsers])
                for (let user of currUsers) {
                    if (user.hasOwnProperty("picks") && user.picks.hasOwnProperty(leagueID) && user.picks[leagueID].hasOwnProperty(week)) {
                        pickers.push({ ...user, pointsEarned: 0 })
                        setPicksExist(true)
                    }
                }
                setUsersWhoMadePicks([...pickers])
                console.log(pickers)
                console.log(pickers)


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

        setLoaded(true)

    }, [week, leagueID, liveWinners])



    const handleLiveWinners = (winners) => {
        setLiveWinners({ ...winners })

    }



    return (




        <div>
            <div className='my-10 rounded-xl w-full lg:w-1/2 mx-auto bg-gradient-to-r p-1 from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
                < div className='flex items-center justify-center flex-col p-3 w-full rounded mx-auto bg-[#181042] text-white rounded-lg' >
                    <h1 className='text-center text-5xl  font-bold '>{league.name} </h1>
                    {isCommissioner ? <Link to={`/leagues/${leagueID}/edit`} className="text-indigo-300 font-semitbold flex items-end justify-between [&>*]:mx-1"> <span>Edit League</span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    </Link> : ""}
                </div >
            </div>
            <h1 className='text-center text-2xl mx-auto my-10 border-2 border-white bg-[#181042]  w-1/3 p-3 rounded shadow-xl text-white'> Week
                <select name="weekNumber" className='rounded bg-[#181042]' onChange={(e) => { setWeek(e.target.value); setPicksExist(false) }}>
                    {weeks.map(weekNumber => <option value={weekNumber}>{weekNumber}</option>)}
                </select>
            </h1>
            <WeekLiveResults week={week} handleLiveWinners={handleLiveWinners} loaded={loaded} />
            < WeekStandings users={usersWhoMadePicks} />


            {
                liveWinners && !picksExists ?
                    <>
                        <h1 className='text-center my-5 text-2xl text-white'>No User Has Made Picks for Week {week}</h1>
                    </>
                    :
                    week < currentWeek ?
                        <div className='mx-auto  text-center flex justify-around flex-wrap lg:flex-nowrap   my-3'>
                            {usersWhoMadePicks.map(user =>
                                <>
                                    <div className=' rounded-xl w-full md:basis-1/2 lg:basis-1/4 my-5 mx-auto bg-gradient-to-r p-1 from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
                                        <div className='flex-col justify-start rounded-xl '>
                                            <p className="p-1  w-full font-bold text-white bg-[#181042] rounded-t-xl">{user.firstName}</p>
                                            <p className="p-1  w-full font-bold bg-[#211f52] text-white border-b-2">Score: {user.pointsEarned}</p>
                                            {user.picks[leagueID][week].map(pick =>
                                                <>
                                                    <div className={`flex justify-between [&>*]:mx-5 bg-[#211f52] w-full font-bold last:rounded-b-xl ${liveWinners && liveWinners[pick.gameID] && liveWinners[pick.gameID].winner === pick.winner ? "text-green-400" : "text-red-400"}  ${liveWinners && liveWinners[pick.gameID] && liveWinners[pick.gameID].status === "Not Played" ? "text-slate-100" : ""}`}>
                                                        <p >{pick.winner}</p>
                                                        <p > {pick.points}</p>
                                                    </div>
                                                </>)}
                                        </div>
                                    </div>
                                </>

                            )}
                        </div>
                        :
                        <div>
                            <p className={` w-full lg:w-1/2 font-bold mx-auto my-0 text-center mt-3 text-2xl text-white`}>Your Picks For Week {week}</p>
                            <p className='text-sm text-slate-500 font-bold mx-auto text-center mb-3'>The rest of the league's picks will display once the the first game of the week kicks off!</p>
                            {user.picks && user.picks[leagueID] && user.picks[leagueID][week] ? user.picks[leagueID][week].map(pick =>
                                <>
                                    <div className={`flex justify-between [&>*]:mx-5  w-full lg:w-1/2 font-bold mx-auto my-3 ${liveWinners && liveWinners[pick.gameID] && liveWinners[pick.gameID].status === "Not Played" ? "text-white" : ""}`}>
                                        <p >{pick.winner}</p>
                                        <p > {pick.points}</p>
                                    </div>
                                </>
                            )
                                : <p className='text-white text-center font-bold text-2xl mx-auto'>You have not made picks for this week</p>}
                        </div>
            }
        </div >






    )

}

export default LeagueUserPicks



{/* <div>
<div className='flex items-center justify-center flex-col mb-10'>
    <h1 className='text-center text-5xl  font-bold '>{league.name} </h1>
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
    week < currentWeek ?
        <div className='mx-auto  text-center flex justify-around flex-wrap lg:flex-nowrap   my-3'>
            {usersWhoMadePicks.map(user =>
                <>
                    <div className='flex-col justify-start border-2 rounded-md w-full md:basis-1/2 lg:basis-1/4 my-5'>
                        <p className="p-1  w-full font-bold bg-slate-500 text-white">{user.firstName}</p>
                        <p className="p-1  w-full font-bold bg-slate-200">Score: {user.pointsEarned}</p>
                        {user.picks[leagueID][week].map(pick =>
                            <>
                                <div className={`flex justify-between [&>*]:mx-5 even:bg-slate-200 w-full font-bold ${liveWinners[pick.gameID].winner === pick.winner ? "text-green-400" : "text-red-400"}  ${liveWinners[pick.gameID].status === "Not Played" ? "text-black" : ""}`}>
                                    <p >{pick.winner}</p>
                                    <p > {pick.points}</p>
                                </div>
                            </>)}
                    </div>
                </>

            )}
        </div>
        :
        <div>
            <p className={` w-full lg:w-1/2 font-bold mx-auto my-0 text-center mt-3`}>Your Picks For Week {week}</p>
            <p className='text-sm text-slate-500 font-bold mx-auto text-center mb-3'>The rest of the league's picks will display once the the first game of the week kicks off!</p>
            {user.picks && user.picks[leagueID] ? user.picks[leagueID][week].map(pick =>
                <>
                    <div className={`flex justify-between [&>*]:mx-5 even:bg-slate-200 w-full lg:w-1/2 font-bold mx-auto my-3 ${liveWinners[pick.gameID].status === "Not Played" ? "text-black" : ""}`}>
                        <p >{pick.winner}</p>
                        <p > {pick.points}</p>
                    </div>
                </>
            )
             : <p>No picks</p>}
        </div>
}
</div> */}

