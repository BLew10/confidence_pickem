import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import Login from '../components/Login';
import NavBar from '../components/NavBar';
import {
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom"


const Home = (props) => {
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false)
    const [errors, setErrors] = useState([])
    const [registered, setRegistered] = useState(false)
    const [loginErrors, setLoginErrors] = useState()

    const newUser = (user) => {
        axios.post('http://localhost:8000/api/users/new', user, { withCredentials: true })
            .then(res => {
                if (res.data.message === "User already exists") {
                    setErrors([res.data.message])
                } else {
                    navigate(`/users/home`)
                }
            })
            .catch(err => {
                console.log(err)
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

    const login = (user) => {
        console.log(user)
        axios.post('http://localhost:8000/api/users/login', user, { withCredentials: true }
        )
            .then(res => {
                navigate(`/users/home`)
                // navigate(`/weeks/1`)
            })
            .catch(err => {
                console.log(err)
                setLoginErrors(err.response.data.msg)
            })
    }


    return (


        <div className='w-1/2 lg:w-1/3 mx-auto my-[10%]'>
            <h1 className='bg-gradient-to-br from-zinc-900 via-indigo-500 to-gray-900 bg-clip-text text-transparent font-bold text-center my-3 text-5xl'>Play Action Picks</h1>
            <div className='w-full font-bold '>
                <button onClick={() => setRegistered(false)} className={`p-3 w-1/2 mx-0 rounded-l-lg border-2 border-slate-300 border-r-0 ${!registered ? "bg-gradient-to-br from-zinc-900 via-indigo-500 to-gray-900 text-white" : ""}`}>Sign Up</button>
                <button onClick={() => setRegistered(true)} className={`p-3  mx-0 w-1/2 rounded-r-lg  border-2 border-slate-300 border-l-0 ${registered ? "bg-gradient-to-br from-zinc-900 via-indigo-500 to-gray-900 text-white" : ""}`}>Login</button>
            </div>
            {!registered ? <RegistrationForm onSubmitProp={newUser} initialFirstName="" initialLastName="" initialEmail="" errors={errors} />
                : <Login onSubmitProp={login} errors={loginErrors} />
            }

        </div>
    )
}

export default Home