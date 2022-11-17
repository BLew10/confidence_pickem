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

    const handlePicks = (incomingPicks) => {
        setPicks([...incomingPicks])
        newLeaguePicks[leagueID] = {}
        newLeaguePicks[leagueID][currWeek] = incomingPicks
        newWeekPicks[currWeek] = incomingPicks
        axios.put(`http://localhost:8000/api/users/${user._id}`, {
            newLeaguePicks: newLeaguePicks, leagueID: leagueID, weekId: currWeek, weekPicks: newWeekPicks
        }, { withCredentials: true })
    }

    const handleLeague = (leagueID) => {
        setLeagueID(leagueID)
    }


    return (
        <div>
            <NavBar currentPage = "Dashboard" />
            <h1>Hello {user.firstName}</h1>
            <UserLeagues handleLeague={handleLeague} />
            {leagueID ? <WeekDisplay  handlePicks={handlePicks} handleWeek={handleWeek} leagueID={leagueID}/> : <p className='text-center text-2xl mx-auto my-10 animate-pulse'>Click League You Would Like to Set Your Picks For </p>}



        </div>
    )
}

export default Dashboard