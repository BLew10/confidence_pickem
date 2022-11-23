import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserLeagues from '../components/UserLeagues';
import WeekDisplay from '../components/WeekDisplay';
import NavBar from '../components/NavBar';
import {
    Routes,
    Route,
    Link,
    useNavigate, useParams
} from "react-router-dom"



const Dashboard = (props) => {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    const [currWeek, setCurrWeek] = useState(1)
    const [picks, setPicks] = useState([])
    const [leagueID, setLeagueID] = useState("")
    let newLeaguePicks = {}
    let newWeekPicks = {}


    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/getloggedinuser`, { withCredentials: true })
            .then(res => {
                setUser(res.data.results)
            })
            .catch(err => console.log(err))


    }, [])

    const handleWeek = (weekNum) => {
        setCurrWeek(weekNum)

    }

    const handlePicks = (incomingPicks, weekForPicks) => {
        setPicks([...incomingPicks])
        newLeaguePicks[leagueID] = {}
        newLeaguePicks[leagueID][weekForPicks] = incomingPicks
        newWeekPicks[weekForPicks] = incomingPicks


        axios.put(`http://localhost:8000/api/users/${user._id}`, {
            newLeaguePicks: newLeaguePicks, leagueID: leagueID, weekId: weekForPicks, weekPicks: newWeekPicks
        }, { withCredentials: true })
            .then(res => navigate(`/leagues/${leagueID}`))
            
    }

    const handleLeague = (leagueID) => {
        setLeagueID(leagueID)
    }


    return (
        <div>
            <NavBar currentPage="Dashboard" />
            <div className='rounded-xl w-1/4 mx-auto  mt-10 bg-gradient-to-r p-[4px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] my-5 '>
                <h1 className='text-3xl text-center flex flex-col justify-between h-full bg-[#120C36] text-white rounded-lg p-4'>Welcome, {user.firstName}</h1>
            </div>
            <UserLeagues handleLeague={handleLeague} />
            {leagueID ? <WeekDisplay handlePicks={handlePicks} handleWeek={handleWeek} leagueID={leagueID} /> :
                <div className='flex flex-col justify-center items-center my-5'>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 animate-bounce text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                    </svg>

                    <p className='text-center text-2xl text-white mx-auto animate-pulse bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] rounded w-1/2 p-3'>Click League You Would Like to Set Your Picks For or Join/Create a League</p>
                </div>
            }



        </div>
    )
}

export default Dashboard