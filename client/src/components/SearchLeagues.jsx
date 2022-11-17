import axios from 'axios';
import React, { useState, useEffect } from 'react'
import {
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom"
import './teams.css'

const SearchLeagues = (props) => {
    const { joinLeague } = props
    const [displayLeagues, setDisplayLeagues] = useState([])
    const [leagues, setLeagues] = useState()
    let [displayPasswordInput, setDisplayPasswordInput] = useState({})
    const [password, setPassword] = useState()
    const [desiredLeague, setDesiredLeague] = useState()
    const [errors, setErrors] = useState()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/leagues`, { withCredentials: true })
            .then(res => {
                setLeagues([...res.data])
                setDisplayLeagues([...res.data])
                for (let league in res.data) {
                    displayPasswordInput[league._id] = false
                }
                setDisplayPasswordInput(displayPasswordInput)
            })
            .catch(err => console.log(err))

    }, [])

    const searchLeagues = (e) => {
        let search = e.target.value
        let matchedLeagues = []
        for (let league of leagues) {
            let name = league.name.toLowerCase()
            if (name.includes(search.toLowerCase())) {
                matchedLeagues.push(league)
            }
        }
        setDisplayLeagues(matchedLeagues)

    }

    const handleClick = (e) => {
        console.log("CLICKED")
        displayPasswordInput = Object.keys(displayPasswordInput).reduce((accumulator, key) => {
            return { ...accumulator, [key]: false };
        }, {});
        displayPasswordInput[e.target.id] = true

        console.log(displayPasswordInput)
        setDisplayPasswordInput({ ...displayPasswordInput })


    }

    const submission = (leagueID) => {
        console.log(password)

        joinLeague(leagueID, password)

    }



    return (
        <div  className="my-2 flex flex-col justify-center w-2/3 lg:w-1/3 mx-auto">
            <p className='flex my-3 '>
                <label className='basis-1/4 font-bold'>Search Leagues: </label>
                <input type="search" onInput={(e) => searchLeagues(e)} className="border-2 border-slate-300 rounded basis-3/4" />
            </p>
            <div>
                {displayLeagues.map(league => <>

                    <p className={`p-2 rounded w-full hover:scale-105 font-semibold hover:font-bold hover:cursor-pointer ${displayPasswordInput[league._id] ? "bg-indigo-500 font-bold": "odd:bg-indigo-300 even:bg-slate-200"}`} id={league._id} onClick={(e) => handleClick(e)}>{league.name}</p>
                    {displayPasswordInput[league._id] ? <div className='flex justify-between items-center font-semibold'><label htmlFor="">Password: </label><input type="text" name="password" id={league._id} className="border-2 border-slate-300 rounded mx-2 w-2/3" onChange={(e) => setPassword(e.target.value)} /> <button className='p-1 bg-indigo-200 rounded' onClick={() => submission(league._id)}>Join League</button></div> : ""}
                </>
                )}
            </div>
        </div>
    )
}

export default SearchLeagues