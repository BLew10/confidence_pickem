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
    const [registered, setRegistered] = useState(true)
    const [loginErrors, setLoginErrors] = useState()

    const newUser = (user) => {
        axios.post('http://localhost:8000/api/users/new', user, {withCredentials: true})
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
        axios.post('http://localhost:8000/api/users/login', user, {withCredentials: true}
        )
            .then(res => {
                navigate(`/users/home`)
            })
            .catch(err => {
                console.log(err)
                setLoginErrors(err.response.data.msg)
            })
    }


    return (

        <div className='rounded-xl my-[10%]  w-3/4 lg:w-1/3 mx-auto bg-gradient-to-r p-[4px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
            
            <div className='w-full mx-auto  bg-[#181042] py-3 px-5 rounded-xl'>
                <h1 className='p-4 h-full bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6]  to-[#9333EA] bg-clip-text text-transparent font-bold  basis-1/4 font-bold text-center my-3 text-5xl'>Play Action Picks</h1>
                <p className='text-white font-semibold text-center mb-3 '> <span className='text-red-500'>    ATTENTION:</span>  Currently Unplayable Due to Limited API Calls. Feel Free to Still Login/Sign Up to Explore the Site!</p>
                <div className='w-full font-bold '>
                    <button onClick={() => setRegistered(true)} className={`p-3  mx-0 w-1/2 rounded-l-lg bg-white border-2 border-slate-300 border-r-0 ${registered ? " bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] text-white" : ""}`}>Login</button>
                    <button onClick={() => setRegistered(false)} className={`p-3 w-1/2 mx-0 rounded-r-lg bg-white border-2 border-slate-300 border-l-0 ${!registered ? " bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] text-white" : ""}`}>Sign Up</button>
                </div>
                {registered ? <Login onSubmitProp={login} errors={loginErrors} />
                    : <RegistrationForm onSubmitProp={newUser} initialFirstName="" initialLastName="" initialEmail="" errors={errors} />
                }

            </div>
        </div>
    )
}

export default Home