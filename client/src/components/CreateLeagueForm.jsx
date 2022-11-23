import React, { useState } from 'react'
import axios from 'axios';
import {
    useNavigate
} from "react-router-dom"


const CreateLeagueForm = (props) => {
    const { errors } = props
    const navigate = useNavigate()
    const { initialName, onSubmitProp } = props
    const [league, setLeague] = useState({
        name: initialName,
        password: "",
        confirmPassword: ""

    });


    const changeHandler = (e) => {
        setLeague({ ...league, [e.target.name]: e.target.value })
    }
    const onSubmitHandler = e => {
        //prevent default behavior of the submit
        e.preventDefault();
        onSubmitProp(league)
    }



    return (
        <form onSubmit={onSubmitHandler}  className="my-2 flex flex-col justify-between items-center text-white mx-auto w-full lg:w-1/2">
            {errors.map((err, index) => <p className='text-red-500 font-bold' key={index}>{err}</p>)}
            <p className='flex my-5 w-full justify-between'>
                <label  className="basis-1/2    font-bold ">League Name: </label>
                <input className='border-2 border-slate-300 rounded w-full basis-1/2  md:basis-3/4 text-black' type="text" onChange={(e) => changeHandler(e)} value={league.name} name="name" />
            </p>
            <p p className='flex my-5  w-full justify-between '>
                <label className="basis-1/2    font-bold">Password: </label>
                <input className='border-2 border-slate-300 rounded w-full basis-1/2  md:basis-3/4 text-black ' type="text" onChange={(e) => changeHandler(e)} value={league.password} name="password" />
            </p>

            <p p className='flex my-5  w-full justify-between  '>
                <label className="basis-1/2  font-bold ">Confirm Password: </label>
                <input className='border-2 border-slate-300 rounded w-full basis-1/2 md:basis-3/4 text-black ' type="text" onChange={(e) => changeHandler(e)} value={league.confirmPassword} name="confirmPassword" />
            </p>
            <input className='p-1 bg-[#98b9ff] rounded w-2/3 mx-auto hover:cursor-pointer hover:scale-105 hover:bg-indigo-200 font-semibold text-white' type="submit" />
        </form>
    )
}

export default CreateLeagueForm