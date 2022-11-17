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
                navigate("/")
            })
            .catch(err => console.log(err))
    }

    if (currentPage === "Dashboard") {
        links = () => {
            return (
                <div className='flex justify-end items-center  basis-3/4 lg:basis-1/3 mr-5'>
                    <div className='flex justify-between items-center w-full'>
                        <Link to={'/leagues/create'} className="text-white font-semibold hover:shadow-lg hover:text-indigo-500 hover:bg-white p-3 rounded">Create a League </Link>

                        <Link to={'/leagues'} className=" bg-[#120C36] text-white px-2 py-3 font-semibold hover:shadow-lg hover:text-indigo-500 hover:bg-white  rounded-xl">Join a League </Link>
                        <div className='bg-gradient-to-r px-[3px] py-[14px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] rounded-lg hover:bg-white'>
                            <Link to={'/users/home'} className=" bg-[#120C36] text-white px-2 py-3 font-semibold hover:shadow-lg hover:text-indigo-500 hover:bg-white  rounded-lg"> Dashboard </Link>
                        </div>
                        <button onClick={() => logout()} className="bg-[#98b9ff] p-2 rounded mx-3 hover:scale-105">Logout</button>
                    </div>
                </div>

            )
        }
    } else if (currentPage === "Create League") {
        links = () => {
            return (
                <div className='flex justify-end items-center  basis-3/4 lg:basis-1/3 mr-5'>
                    <div className='flex justify-between items-center w-full'>
                        <div className='bg-gradient-to-r px-[3px] py-[14px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] rounded-lg hover:bg-white'>
                            <Link to={'/leagues/create'} className="bg-[#120C36] text-white px-2 py-3 font-semibold hover:shadow-lg hover:text-indigo-500 hover:bg-white  rounded-lg">Create a League </Link>
                        </div>
                        <Link to={'/leagues'} className=" bg-[#120C36] text-white px-2 py-3 font-semibold hover:shadow-lg hover:text-indigo-500 hover:bg-white  rounded-xl">Join a League </Link>

                        <Link to={'/users/home'} className="text-white  font-semibold hover:shadow-lg hover:text-indigo-500 hover:bg-white p-3 rounded"> Dashboard </Link>
                        <button onClick={() => logout()} className="bg-[#98b9ff] p-2 rounded mx-3 hover:scale-105">Logout</button>
                    </div>
                </div>

            )
        }

    } else if (currentPage === "Join A League") {
        links = () => {
            return (
                <div className='flex justify-end items-center  basis-3/4 lg:basis-1/3 mr-5'>
                    <div className='flex justify-between items-center w-full'>
                        <Link to={'/leagues/create'} className="text-white font-semibold hover:shadow-lg hover:text-indigo-500 hover:bg-white p-3 rounded">Create a League </Link>
                        <div className='bg-gradient-to-r px-[3px] py-[14px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] rounded-lg hover:bg-white'>
                            <Link to={'/leagues'} className=" bg-[#120C36] text-white px-2 py-3 font-semibold hover:shadow-lg hover:text-indigo-500 hover:bg-white  rounded-lg">Join a League </Link>
                        </div>
                        <Link to={'/users/home'} className="text-white  font-semibold hover:shadow-lg hover:text-indigo-500 hover:bg-white p-3 rounded"> Dashboard </Link>
                        <button onClick={() => logout()} className="bg-[#98b9ff] p-2 rounded mx-3 hover:scale-105">Logout</button>
                    </div>
                </div>

            )
        }

    } else {
        links = () => {
            return (
                <div className='flex justify-end items-center  basis-3/4 lg:basis-1/3 mr-5'>
                    <div className='flex justify-between items-center w-full'>
                        <Link to={'/leagues/create'} className="text-white font-semibold hover:shadow-lg hover:text-indigo-500 hover:bg-white p-3 rounded">Create a League </Link>
                        <Link to={'/leagues'} className=" bg-[#120C36] text-white px-2 py-3 font-semibold hover:shadow-lg hover:text-indigo-500 hover:bg-white  rounded-xl">Join a League </Link>
                        <Link to={'/users/home'} className="text-white  font-semibold hover:shadow-lg hover:text-indigo-500 hover:bg-white p-3 rounded"> Dashboard </Link>
                        <button onClick={() => logout()} className="bg-[#98b9ff] p-2 rounded mx-3 hover:scale-105">Logout</button>
                    </div>
                </div>

            )
        }

    }

    return (
        <div className='w-full  h-[100px] flex justify-between items-center '>
            <div className='text-2xl text-white font-bold ml-5'>Play Action Picks</div>
            {links()}
        </div>
    )
}

export default NavBar