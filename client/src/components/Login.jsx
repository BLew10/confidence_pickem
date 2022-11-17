import React, { useState } from 'react'
import axios from 'axios';
import {
    useNavigate
} from "react-router-dom"

const Login = (props) => {
    const { errors, onSubmitProp } = props
    const [user, setUser] = useState({})


    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp(user)
    }



    return (
        <form onSubmit={onSubmitHandler} className="my-2 flex flex-col justify-center text-white">
            {errors ? <p className='text-red-500 font-bold' >{errors}</p> : ""}
            <p className='flex my-3 '>
                <label className="basis-1/4  font-bold " >Email: </label>
                <input className='border-2 border-slate-300 rounded w-full basis-2/3 md:basis-3/4 text-black ' type="text" onChange={(e) => changeHandler(e)} value={user.email} name="email" />
            </p>
            <p className='flex my-3 '>
                <label  className="basis-1/4  font-bold ">Password: </label>
                <input className='border-2 border-slate-300 rounded w-full basis-2/3 md:basis-3/4 text-black' type="text" onChange={(e) => changeHandler(e)} value={user.password} name="password" />
            </p>
            <input className='p-1 bg-indigo-400 rounded w-2/3 mx-auto hover:cursor-pointer hover:scale-105 hover:bg-indigo-200 font-semibold text-slate-100 text-black' type="submit" />
        </form>
    )
}

export default Login