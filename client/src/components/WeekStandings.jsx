import axios from 'axios';
import { set } from 'mongoose';
import React, { useState, useEffect } from 'react'
import './teams.css'

const WeekStandings = (props) => {

    const { users } = props
    const [standings, setStandings] = useState([])
    useEffect(() => {
        setStandings(users.sort((p1, p2) => (p1.pointsEarned < p2.pointsEarned) ? 1 : (p1.pointsEarned > p2.pointsEarned) ? -1 : 0))
    }, [users])



    return (
        <div className='flex flex-col items-center justify-start w-full lg:w-1/4 mx-auto'>
            <h1 className='text-center w-full border-2 bg-slate-500 text-white font-bold'>Week Standings</h1>
            <div className='flex justify-between w-full bg-slate-200 [&>*]:mx-1  border-2'>
                <p className='font-bold  basis-1/3'>Ranking</p>
                <p className='text-center font-bold basis-1/3 text-center'>Name</p>
                <p className='font-bold text-right basis-1/3'>Points Earned</p>
            </div>
            {standings.map((player, i) =>
                <>
                    <div className='flex justify-between w-full even:bg-slate-200 [&>*]:mx-1  border-2'>
                        <p className='font-bold basis-1/3'>{i + 1}</p>
                        <p className='text-center basis-1/3'>{player.firstName}</p>
                        <p className='font-bold text-right basis-1/3'>{player.pointsEarned}</p>
                    </div>
                </>
            )}
        </div >
    )
}

export default WeekStandings