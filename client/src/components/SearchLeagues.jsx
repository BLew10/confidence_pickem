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
        displayPasswordInput = Object.keys(displayPasswordInput).reduce((accumulator, key) => {
            return { ...accumulator, [key]: false };
        }, {});
        setDisplayPasswordInput({ ...displayPasswordInput })
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
        displayPasswordInput = Object.keys(displayPasswordInput).reduce((accumulator, key) => {
            return { ...accumulator, [key]: false };
        }, {});
        displayPasswordInput[e.target.id] = true
        setDisplayPasswordInput({ ...displayPasswordInput })


    }

    const submission = (leagueID) => {
        joinLeague(leagueID, password)
    }



    return (
        <div className='rounded-xl w-full  lg:w-1/2 mx-auto bg-gradient-to-r p-1 from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
            <div className="flex flex-col justify-center rounded-xl mx-auto  rounded shadow-md shadow-[#98b9ff] bg-[#181042] h-full  ">
                <p className='flex my-3 px-3 bg-[#181042]'>
                    <label className='basis-1/4 font-bold text-white'>Search Leagues: </label>
                    <input type="search" onInput={(e) => searchLeagues(e)} className="  rounded basis-3/4 text-black" />
                </p>
                <div>
                    {displayLeagues.map(league => <>

                        <p className={`p-2 text-white w-full hover:scale-105 font-semibold font-bold last:rounded-b-xl bg-[#211f52]   hover:cursor-pointer ${displayPasswordInput[league._id] ? "border-2 border-[#98b9ff] rounded-t-md scale-105" : ""}`} id={league._id} onClick={(e) => handleClick(e)}>{league.name}</p>
                        {displayPasswordInput[league._id] ? <div className='flex justify-between items-center scale-105 bg-[#98b9ff] font-semibold text-white rounded-b-md p-1'><label htmlFor="">Password: </label><input type="text" name="password" id={league._id} className="border-2 border-slate-300 rounded mx-2 w-2/3 text-black" onChange={(e) => setPassword(e.target.value)} /> <button className='text-white mx-auto animate-pulse bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] rounded w-1/2 p-1' onClick={() => submission(league._id)}>Join League</button></div> : ""}
                    </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchLeagues