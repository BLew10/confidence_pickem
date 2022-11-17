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
        <div className='w-full lg:w-1/3 mx-auto bg-gradient-to-r p-1 from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] rounded-lg'>
            <div className='flex flex-col items-center justify-start w-full mx-auto '>
                <h1 className='text-center w-full bg-[#181042] text-white font-bold rounded-t-lg '>Week Standings</h1>
                <div className='flex justify-between w-full bg-[#211f52] text-white border-b-2 [&>*]:mx-1  '>
                    <p className='font-bold  basis-1/3'>Ranking</p>
                    <p className='text-center font-bold basis-1/3 text-center'>Name</p>
                    <p className='font-bold text-right basis-1/3'>Points Earned</p>
                </div>
                {standings.map((player, i) =>
                    <>
                        <div className='flex justify-between w-full bg-[#211f52] text-white font-semibold first: [&>*]:mx-1  last:rounded-b-lg'>
                            <p className={` ${ i === 0 ? "bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6]  to-[#9333EA] bg-clip-text text-transparent": "" } basis-1/3  font-bold `}>{i + 1}</p>
                            <p className={` ${ i === 0 ? "bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6]  to-[#9333EA] bg-clip-text text-transparent": "" } text-center basis-1/3  font-bold `}>{player.firstName}</p>
                            <p className={` ${ i === 0 ? "bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6]  to-[#9333EA] bg-clip-text text-transparent": "" } text-right basis-1/3  font-bold `}>{player.pointsEarned}</p>
                        </div>
                    </>
                )}
            </div >
        </div>
    )
}

export default WeekStandings