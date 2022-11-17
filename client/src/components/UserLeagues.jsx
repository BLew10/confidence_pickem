import axios from 'axios';
import React, { useState, useEffect } from 'react'
import {
    Routes,
    Route,
    Link,
    useNavigate,
    Navigate
} from "react-router-dom"
import './teams.css'


const UserLeagues = (props) => {
    const { handleLeague } = props
    const [leagues, setLeagues] = useState([])
    const navigate = useNavigate()
    const [user, setUser] = useState()
    let [currentLeague, setCurrentLeague] = useState({})


    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/getloggedinuser`, { withCredentials: true })
            .then(res => {
                setUser(res.data.results)
                setLeagues(res.data.results.leagues)
                let currLeague = {}
                for (let league in res.data.results.leagues) {
                    currLeague[league._id] = false
                }
                setCurrentLeague({ ...currLeague })
            })
            .catch(err => console.log(err))

    }, [])

    const handleClick = (e, leagueID) => {
        currentLeague = Object.keys(currentLeague).reduce((accumulator, key) => {
            return { ...accumulator, [key]: false };
        }, {});
        currentLeague[e.target.id] = true
        setCurrentLeague({ ...currentLeague })
        handleLeague(leagueID)

    }


    return (
        <div className='flex flex-col w-full lg:w-1/2 mx-auto rounded shadow-lg shadow-[#98b9ff] '>
            <div className='text-center text-2xl bg-[#181042] font-bold text-white rounded-t-lg p-2'>Current Leagues</div>
            {leagues.map(league =>
                <>
                    <p className='flex align-center justify-start items-center w-full'>
                        <div className={` font-bold  hover:bg-gradient-to-r hover:p-[4px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] rounded-xl basis-3/4 ${currentLeague[league._id] ? "rounded-xl w-1/4 mx-auto bg-gradient-to-r p-[4px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]":""}`}>
                            <button className={`text-white bg-[#120C36]  h-full  w-full flex flex-col justify-between h-full bg-[#120C36] text-white rounded-lg p-4 `} onClick={(e) => handleClick(e, league._id)} id={league._id}>{league.name}</button>
                        </div>
                        <button onClick={() => navigate(`/leagues/${league._id}`)} className="p-4 h-full bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6]  to-[#9333EA] bg-clip-text text-transparent font-bold hover:scale-105 basis-1/4 hover:bg-indigo-400">View League</button>
                    </p>
                </>
            )}
        </div>
    )
}

export default UserLeagues
