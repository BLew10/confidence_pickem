import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Routes,
    Route,
    Link,
    useNavigate, useParams
} from "react-router-dom"

const NavBar = (props) => {
    const { currentPage } = props
    const navigate = useNavigate()
    let links = null

    const logout = () => {
        axios.get(`http://localhost:8000/api/users/logout`, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                navigate("/")
            })
            .catch(err => console.log(err))
    }

    if (currentPage === "Dashboard") {
        links = () => {
            return (
                <div className='flex justify-end items-center basis-1/2 lg:basis-1/3'>
                    <div className='flex justify-between items-center w-full'>
                        <Link to={'/leagues/create'} className="text-white mx-3 font-semibold hover:shadow-lg hover:text-indigo-500 hover:bg-white p-3 rounded">Create a League </Link>
                        <Link to={'/leagues'} className="text-white mx-3 font-semibold hover:shadow-lg hover:text-indigo-500 hover:bg-white p-3 rounded">Join a League </Link>
                        <button onClick={() => logout()} className="bg-red-300 p-2 rounded mx-1 font-semibold hover:scale-105">Logout</button>
                    </div>
                </div>

            )
        }
    } else if (currentPage === "Create League") {
        links = () => {
            return (
                <div className='flex justify-end items-center basis-1/2 lg:basis-1/4'>
                    <div className='flex justify-end items-center w-full'>
                        <Link to={'/leagues'} className="text-white mx-3 font-semibold hover:shadow-lg hover:text-indigo-500 hover:bg-white p-3 rounded">Join a League </Link>
                        <Link to={'/users/home'} className="text-white mx-3 font-semibold hover:shadow-lg hover:text-indigo-500 hover:bg-white p-3 rounded"> Dashboard </Link>
                        <button onClick={() => logout()} className="bg-red-300 p-2 rounded mx-1">Logout</button>
                    </div>
                </div>
            )
        }

    } else {
        links = () => {
            return (
                <div className='flex justify-end items-center  basis-3/4 lg:basis-1/3'>
                    <div className='flex justify-between items-center w-full'>
                        <Link to={'/leagues/create'} className="text-white mx-3 font-semibold hover:shadow-lg hover:text-indigo-500 hover:bg-white p-3 rounded">Create a League </Link>
                        <Link to={'/leagues'} className="text-white mx-3 font-semibold hover:shadow-lg hover:text-indigo-500 hover:bg-white p-3 rounded">Join a League </Link>
                        <Link to={'/users/home'} className="text-white mx-3 font-semibold hover:shadow-lg hover:text-indigo-500 hover:bg-white p-3 rounded"> Dashboard </Link>
                        <button onClick={() => logout()} className="bg-red-300 p-2 rounded mx-3 hover:scale-105">Logout</button>
                    </div>
                </div>

            )
        }

    }

    return (
        <div className='w-full bg-gradient-to-br from-zinc-900 via-indigo-500 to-gray-900 h-[100px] flex justify-between items-center'>
            <div className='text-2xl text-white font-bold'>Play Action Picks</div>
            {links()}
        </div>
    )
}

export default NavBar