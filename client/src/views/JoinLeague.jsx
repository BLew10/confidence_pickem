import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SearchLeagues from '../components/SearchLeagues';
import NavBar from '../components/NavBar';
import {
    Routes,
    Route,
    Link,
    useNavigate, useParams
} from "react-router-dom"



const JoinLeague = (props) => {
    const navigate = useNavigate()
    const [user, setUser] = useState({})


    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/getloggedinuser`, { withCredentials: true })
            .then(res => {
                setUser(res.data.results)
            })
            .catch(err => console.log(err))

    }, [])



    const joinLeague = (leagueID, password) => {
        axios.put(`http://localhost:8000/api/users/addleague/${leagueID}`, {
            userID: user._id, password: password, leagueID:leagueID
        }, { withCredentials: true })
            .then(res => {
                navigate("/users/home")
            })
            .catch(err => console.log(err))


    }


    return (
        <div>
            <NavBar currentPage="Join A League" />
            <SearchLeagues joinLeague={joinLeague} />
        </div>
    )
}

export default JoinLeague

