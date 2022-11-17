import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LeagueUserPicks from '../components/LeagueUserPicks';
import NavBar from '../components/NavBar';
import {
    Link,
    useNavigate, useParams
} from "react-router-dom"



const LeagueDisplay = (props) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [league, setLeague] = useState({})






    return (
        <div className=''>
            <NavBar currentPage="League Display"/>
            <LeagueUserPicks  leagueID={id} />
        </div>
    )
}

export default LeagueDisplay