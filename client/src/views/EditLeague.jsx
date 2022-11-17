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


const EditLeague = (props) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [errors, setErrors] = useState([])
    const [league, setLeague] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/getloggedinuser`, { withCredentials: true })
            .then(res => {
                setUser(res.data.results)
            })
            .catch(err => console.log(err))

        axios.get(`http://localhost:8000/api/leagues/${id}`, { withCredentials: true })
            .then(res => {
                setLeague(res.data[0])
            })
            .catch(err => console.log(err))

    }, [id])



    const editLeague = (league) => {
        axios.put(`http://localhost:8000/api/leagues/${id}`, { ...league, commissioner: user._id }, { withCredentials: true })
            .then(res => {
                if (res.data.message === "League already exists") {
                    setErrors([res.data.message])
                } else {
                    navigate(`/leagues/${id}`)
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




    return league ? (

        <div>
            <NavBar currentPage="Create League" />
            <div className='my-[5%] flex justify-center items-center flex-col'>
                <h1 className='font-bold text-2xl text-center text-white'>Edit {league.name}</h1>
                <Link to={`/leagues/${league._id}`} className="text-indigo-300 w-fit hover:scale-105">Back to League</Link>
                <CreateLeagueForm creator={user} initialName={league.name} onSubmitProp={editLeague} errors={errors} />
            </div>
        </div>
    ) : (<p>Loading</p>)
}

export default EditLeague