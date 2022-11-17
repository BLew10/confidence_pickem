import React, { useState } from 'react'
import axios from 'axios';
import {
    useNavigate
} from "react-router-dom"


const UserForm = (props) => {
    const { errors } = props
    const navigate = useNavigate()
    const { initialFirstName, initialLastName, initialEmail, onSubmitProp } = props
    //keep track of what is being typed via useState hook
    const [user, setUser] = useState({
        firstName: initialFirstName,
        lastName: initialLastName,
        email: initialEmail,
        password: "",
        confirmPassword: ""
    });
    //handler when the form is submitted

    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const onSubmitHandler = e => {
        //prevent default behavior of the submit
        e.preventDefault();
        onSubmitProp(user)
    }



    return (
        <form onSubmit={onSubmitHandler} className="my-2 flex flex-col justify-center [&>*]:text-md text-white ">
            {errors.map((err, index) => <p className='text-red-500 font-bold' key={index}>{err}</p>)}
            <p  className='flex my-3'>
                <label className="basis-1/3 font-bold ">First Name: </label>
                <input className='border-2 border-slate-300 rounded w-full basis-2/3 md:basis-3/4  text-black ' type="text" onChange={(e) => changeHandler(e)} value={user.firstName} name="firstName" />
                {/* {errors ? <p className='text-red-500 font-bold' >{errors[0].message}</p> : null } */}
            </p>
            <p className='flex my-3'>
                <label className="basis-1/3 font-bold ">Last Name: </label>
                <input className='border-2 border-slate-300 rounded  w-full basis-2/3 md:basis-3/4  text-black' type="text" onChange={(e) => changeHandler(e)} value={user.lastName} name="lastName" />
            </p>
            <p className='flex my-3'>
                <label  className="basis-1/3 font-bold ">Email: </label>
                <input className='border-2 border-slate-300 rounded w-full basis-2/3 md:basis-3/4  text-black' type="text" onChange={(e) => changeHandler(e)} value={user.email} name="email" />
            </p>
            <p className='flex my-3'>
                <label className="basis-1/3 font-bold ">Password: </label>
                <input className='border-2 border-slate-300 rounded w-full basis-2/3 md:basis-3/4  text-black' type="text" onChange={(e) => changeHandler(e)} value={user.password} name="password" />
            </p>
            <p className='flex my-3'>
                <label className="basis-1/3  font-bold ">Confirm Password: </label>
                <input className='border-2 border-slate-300 rounded w-full basis-2/3 md:basis-3/4  text-black' type="text" onChange={(e) => changeHandler(e)} value={user.confirmPassword} name="confirmPassword" />
            </p>
            <input className='p-1 bg-indigo-400 rounded w-2/3 mx-auto hover:cursor-pointer hover:scale-105 hover:bg-indigo-200 font-semibold text-white text-center flex-none' type="submit" />
        </form>
    )
}

export default UserForm