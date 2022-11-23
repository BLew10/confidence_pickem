import axios from 'axios';
import { set } from 'mongoose';
import React, { useState, useEffect } from 'react'
import {
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom"
import './teams.css'


const WeekLiveResults = (props) => {

    const { week, handleLiveWinners, loaded } = props
    const [games, setGames] = useState([])
    const [winners, setWinners] = useState({})
    const [played, setPlayed] = useState(false)
    let finalWinners = {}


    useEffect(() => {
        axios.get(`http://localhost:8000/api/weeks/${week}`, {withCredentials: true})
            .then(res => {
                console.log(res.data)
                // let weekGames = res.data.week.games
                let weekGames = res.data[0].games
                // setGames(res.data.week.games)
                setGames(res.data[0].games)
                weekGames.forEach((game, i) => {

                    if (game.status === "closed") {
                        setPlayed(true)
                        let homeScore = game.scoring.home_points
                        let awayScore = game.scoring.away_points
                        if (homeScore > awayScore) {
                            finalWinners[game.id] = {
                                winner: game.home.name,
                                loser: game.away.name,
                                alias: game.home.alias,
                                winner_score: game.scoring.home_points,
                                loser_score: game.scoring.away_points,
                                tie: false,
                                status: "Played/Playing"
                            }
                        } else if (awayScore > homeScore) {
                            finalWinners[game.id] = {
                                winner: game.away.name,
                                loser: game.home.name,
                                alias: game.away.alias,
                                winner_score: game.scoring.away_points,
                                loser_score: game.scoring.home_points,
                                tie: false,
                                status: "Played/Playing"
                            }
                        } else {
                            finalWinners[game.id] = {
                                winner: game.home.name,
                                loser: game.away.name,
                                alias: "bg-red-100",
                                winner_score: game.scoring.home_points,
                                loser_score: game.scoring.away_points,
                                tie: true,
                                status: "Played/Playing"
                            }
                        }
                    } else {
                        setPlayed(false)
                        finalWinners[game.id] = {
                            home: game.home.name,
                            away: game.away.name,
                            status: "Not Played"
                        }
                    }
                })

                setWinners({ ...finalWinners })

                handleLiveWinners({ ...finalWinners })




            })
    }, [week]);



    return (

        <div>
            <div className='mx-auto  text-center flex justify-around flex-wrap xl:flex-nowrap'>
                {games.map(game =>

                    played ?

                        <div className='flex flex-col justify-between items-center basis-1/4 my-3 odd:bg-[#211f52] even:bg-[#181042]  rounded  '>
                            <p className={`p-1 font-bold hover:scale-105 text-sm basis-1/2 flex justify-center items-center w-full text-center ${winners[game.id].alias} ${winners[game.id].tie ? "bg-indigo-300" : ""}`}>{winners[game.id].winner}</p>
                            <p className={`basis-1/4 font-bold ${!winners[game.id].tie ? "text-green-500 " : "text-white"}`}>{winners[game.id].winner_score}</p>

                            <p className={`basis-1/4 font-bold ${!winners[game.id].tie ? "text-red-500 " : "text-white"}`}>{winners[game.id].loser_score}</p>
                            <p className={`p-1 font-bold hover:scale-105 text-sm h-20 basis-1/2 w-full text-center flex justify-center items-center ${winners[game.id].tie ? "bg-indigo-300" : "bg-red-100"}`}>{winners[game.id].loser}</p>
                        </div>

                        :

                        <div className='flex flex-col justify-between basis-1/4 my-3  items-center odd:bg-[#211f52] even:bg-[#181042] text-white'>
                            <p className={`p-1 font-bold hover:scale-105 text-sm basis-1/2 flex justify-center items-center w-full text-center`}>{winners[game.id].home} </p>
                            <p>vs</p>
                            <p className={`p-1 font-bold hover:scale-105 text-sm basis-1/2 flex justify-center items-center w-full text-center `}>{winners[game.id].away}</p>
                        </div>




                )}
            </div>
        </div >
    )
}

export default WeekLiveResults


