import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LeagueUserPicks from '../components/LeagueUserPicks';
import NavBar from '../components/NavBar';
import { WeekProvider } from '../context/CurrentWeek';
import {
    Link,
    useNavigate, useParams
} from "react-router-dom"



const LeagueDisplay = (props) => {
    const navigate = useNavigate()
    const { id, weekID } = useParams()
    const [league, setLeague] = useState({})






    return (
        <div className=''>
            <NavBar currentPage="League Display" />
            <WeekProvider>
                <LeagueUserPicks leagueID={id} />
            </WeekProvider>
        </div>
    )
}

export default LeagueDisplay