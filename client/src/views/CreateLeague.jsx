import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CreateLeagueForm from '../components/CreateLeagueForm';
import NavBar from '../components/NavBar';
import {
    Routes,
    Route,
    Link,
    useNavigate, useParams
} from "react-router-dom"


const CreateLeague = (props) => {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [errors, setErrors] = useState([])
    const [league, setLeague] = useState()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/getloggedinuser`, { withCredentials: true })
            .then(res => {
                setUser(res.data.results)
            })
            .catch(err => console.log(err))

    }, [])

    const newLeague = (league) => {
        axios.post('http://localhost:8000/api/leagues/new', { ...league, commissioner: user._id }, { withCredentials: true })
            .then(res => {
                if (res.data.message === "League already exists") {
                    setErrors([res.data.message])
                } else {
                    let leagueID = res.data.results._id
                    axios.put(`http://localhost:8000/api/leagues/adduser/${leagueID}`, {
                        userID: user._id
                    }, { withCredentials: true })
                    navigate(`/users/home`)
                }
            })
            .catch(err => {

                const errorResponse = err.response.data.errors
                const errorArr = []

                for (const key in errorResponse) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr)
            })
            .catch(err => console.log(err))
        setLoaded(false)
    }




    return (
        <div>
            <NavBar currentPage="Create League" />
            <div className='rounded-xl w-full  lg:w-1/3 mx-auto bg-gradient-to-r p-1 from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
                <div className=' bg-[#181042] p-4 w-full mx-auto rounded-lg h-full flex flex-col justify-between h-full'>

                    <h1 className='font-bold text-2xl text-center text-white'>Create a New League</h1>
                    <CreateLeagueForm creator={user} initialName="" onSubmitProp={newLeague} errors={errors} />
                </div>
            </div>
        </div>
    )
}

export default CreateLeague