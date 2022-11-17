import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './teams.css'

const WeekDisplay = (props) => {
    const { handlePicks, handleWeek, leagueID } = props
    const [games, setGames] = useState(null)
    const [winners, setWinners] = useState({})
    const [confirm, setConfirm] = useState([])
    const [points, setPoints] = useState([])
    const [usedPoints, setUsedPoints] = useState([])
    const [leagueName, setLeagueName] = useState("")
    const [ready, setReady] = useState(false)
    const [weeksRemaining, setWeeksRemaining] = useState({})
    const [weeksRemainingNumbers, setWeekRemainingNumbers] = useState([])
    const [currWeek, setCurrWeek] = useState(weeksRemainingNumbers[0])
    const currWinners = {}

    
    useEffect(() => {
        axios.get(`http://api.sportradar.us/nfl/official/trial/v7/en/games/2022/REG/schedule.json?api_key=wvt4t5gk8ynbr6ysc2ydxp5s`)
            .then(res => {
                let remaining = {}
                let remainingCount = []


                let weeks = res.data.weeks
                weeks.forEach((week, i) => {
                    if (week.games[0].status !== "closed") {
                        remaining[i + 1] = week
                        remainingCount.push(i + 1)

                    }
                })

                setWeeksRemaining({ ...remaining })
                setWeekRemainingNumbers([...remainingCount])
                setCurrWeek(remainingCount[0])
                
                let weekGames = remaining[remainingCount[0]].games
                let gameCount = []
                weekGames.forEach((game, i) => {
                    gameCount.push(i + 1)
                    if (!currWinners.hasOwnProperty([game.id])) {
                        currWinners[game.id] = {
                            winner: "",
                            points: 0,
                            gameID: game.id,
                            earned: 0
                        }
                    }
                })
                setGames([...remaining[remainingCount[0]].games])
                setPoints([...gameCount])
                setWinners({ ...currWinners })



                axios.get(`http://localhost:8000/api/leagues/${leagueID}`, { withCredentials: true })
                    .then(res => {
                        setLeagueName(res.data[0].name)
                    })
                    .catch(err => console.log(err))

            })
            .catch(err => console.log(err))
    }, []);




    const toggleWinner = (e, gameID) => {
        winners[gameID].winner = e.target.innerHTML
        setWinners({ ...winners })
        handleReady()
    }

    const handlePoints = (e, gameID) => {
        winners[gameID].points = parseInt(e.target.value)
        let currentPoints = []
        for (let game in winners) {
            currentPoints.push(winners[game].points)
        }
        setUsedPoints([...currentPoints])
        handleReady()
    }

    const handleReady = () => {
        let currentConfirm = []
        for (let game in winners) {
            currentConfirm.push(winners[game])
        }
        setConfirm([...currentConfirm])

        let notReady = []

        for (let pick of currentConfirm) {
            notReady.push(pick.points, pick.winner)
        }

        if (notReady.length < 2 || notReady.includes(0) || notReady.includes("") || notReady.includes(NaN)) {
            setReady(false)
        } else {
            setReady(true)
        }

    }

    const sendPicks = () => {
        handlePicks(confirm, currWeek)
        handleWeek(currWeek)
    }



    const handleWeekChange = (e) => {
        handleWeek(e.target.value)
        setCurrWeek(e.target.value)
        handleConfirmTemplate(e.target.value)
    
    }

    const handleConfirmTemplate = (weekNum) => {

        let weekGames = weeksRemaining[weekNum].games
        let gameCount = []
        weekGames.forEach((game, i) => {
            gameCount.push(i + 1)
            if (!currWinners.hasOwnProperty([game.id])) {
                currWinners[game.id] = {
                    winner: "",
                    points: 0,
                    gameID: game.id,
                    earned: 0
                }
            }
        })

        setPoints([...gameCount])
        setWinners({ ...currWinners })

        setGames([...weeksRemaining[weekNum].games])

    }


    return games ? (
        <div className='my-5'>
            <h1 className='text-center text-2xl mx-auto my-10 border-2 border-white bg-[#181042]  w-1/3 p-3 rounded shadow-xl text-white'> Week <select name="weekNumber" className='rounded bg-[#181042]' onChange={(e) => handleWeekChange(e)}>
                {weeksRemainingNumbers.map(weekNumber => <option value={weekNumber}>{weekNumber}</option>)}
            </select></h1>
            {ready &&
                <div className='flex justify-center my-5'>
                    <button className='bg-indigo-500 p-3 text-white hover:bg-indigo-300 hover:scale-105 font-bold w-1/4 mx-auto animate-pulse rounded-xl' onClick={() => sendPicks()}>Submit for {leagueName} </button>
                </div>
            }
            <div className='mx-auto w-full lg:w-1/2 text-center'>
                {games.map(game =>
                    <>
                        <p className='flex align-center justify-between items-center w-full wrap my-1'>
                            <span className={` basis-1/3  bg-white p-2  w-1/4 rounded-md font-bold hover:scale-105 text-sm hover:cursor-pointer ${winners[game.id].winner === game.home.name ? game.home.alias : ""}`} onClick={(e) => toggleWinner(e, game.id)} id="home" >
                                {game.home.name}
                            </span>
                            <span className='text-2xl text-[#67d9c0] font-bold'>vs</span>
                            <span className={` basis-1/3 bg-white p-2  w-1/4 rounded-md font-bold hover:scale-105 text-sm  hover:cursor-pointer ${winners[game.id].winner === game.away.name ? game.away.alias : ""}`} id="away" onClick={(e) => toggleWinner(e, game.id)}>
                                {game.away.name}
                            </span>
                            <select name={game.id} className="rounded bg-[#67d9c0] p-1 text-center font-bold" onChange={(e) => handlePoints(e, game.id)}>
                                <option value="" className='text-sm'>Select Points</option>
                                {points.map(point => !usedPoints.includes(point) ? <option value={point}>{point}</option> : <option value={point} hidden>{point}</option>)}
                            </select>
                        </p>
                    </>
                )}
            </div>
        </div>
    ) : <p className='animate-bounce text-center my-10 text-2xl font-semibold text-[#67d9c0]'><svg class="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
    </svg>LOADING</p>
}


export default WeekDisplay




// const WeekDisplay = (props) => {
//     const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
//     const { handlePicks, handleWeek, leagueID } = props
//     const [games, setGames] = useState([])
//     const [winners, setWinners] = useState({})
//     const [confirm, setConfirm] = useState([])
//     const [points, setPoints] = useState([])
//     const [usedPoints, setUsedPoints] = useState([])
//     const [currWeek, setCurrWeek] = useState(1)
//     const [leagueName, setLeagueName] = useState("")
//     const [ready, setReady] = useState(false)


//     const currWinners = {}

//     useEffect(() => {
//         axios.get(`http://localhost:8000/api/weeks/${currWeek}`, { withCredentials: true })
//             .then(res => {
//                 let weekGames = res.data[0].games
//                 setGames(res.data[0].games)
//                 let gameCount = []
//                 weekGames.forEach((game, i) => {
//                     gameCount.push(i + 1)
//                     if (!currWinners.hasOwnProperty([game.id])) {
//                         currWinners[game.id] = {
//                             winner: "",
//                             points: 0,
//                             gameID: game.id,
//                             earned: 0
//                         }
//                     }
//                 })

//                 setPoints([...gameCount])
//                 setWinners({ ...currWinners })

//                 axios.get(`http://localhost:8000/api/leagues/${leagueID}`, { withCredentials: true })
//                     .then(res => {
//                         setLeagueName(res.data[0].name)
//                     })
//                     .catch(err => console.log(err))

//             })
//     }, [currWeek, leagueID]);




//     const toggleWinner = (e, gameID) => {
//         winners[gameID].winner = e.target.innerHTML
//         setWinners({ ...winners })
//         handleReady()
//     }

//     const handlePoints = (e, gameID) => {
//         winners[gameID].points = parseInt(e.target.value)
//         let currentPoints = []
//         for (let game in winners) {
//             currentPoints.push(winners[game].points)
//         }
//         setUsedPoints([...currentPoints])
//         handleReady()
//     }

//     const handleReady = () => {
//         let currentConfirm = []
//         for (let game in winners) {
//             currentConfirm.push(winners[game])
//         }
//         setConfirm([...currentConfirm])

//         let notReady = []

//         for (let pick of currentConfirm) {
//             notReady.push(pick.points, pick.winner)
//         }

//         if (notReady.length < 2 || notReady.includes(0) || notReady.includes("") || notReady.includes(NaN)) {
//             setReady(false)
//         } else {
//             setReady(true)
//         }

//     }

//     const sendPicks = () => {
//         handlePicks(confirm)
//     }
//     const sendWeek = (e) => {
//         handleWeek(e.target.value)
//         setCurrWeek(e.target.value)

//     }


//     return (
//         <div className='my-5'>
//             <h1 className='text-center text-2xl mx-auto my-5'> Week <select name="weekNumber" onChange={(e) => sendWeek(e)}>
//                 {weeks.map(weekNumber => <option value={weekNumber}>{weekNumber}</option>)}
//             </select></h1>
//             {ready &&
//                 <div className='flex justify-center my-5'>
//                     <button className='bg-indigo-500 p-3 text-white hover:bg-indigo-300 hover:scale-105 font-bold w-1/4 mx-auto' onClick={() => sendPicks()}>Submit for {leagueName} </button>
//                 </div>
//             }
//             <div className='mx-auto w-full lg:w-1/2 text-center'>
//                 {games.map(game =>
//                     <>
//                         <p className='flex align-center justify-between items-center w-full wrap my-1'>
//                             <span className={` basis-1/3 p-2 border-2 border-slate-200 w-1/4 rounded-md font-bold hover:scale-105 text-sm hover:cursor-pointer ${winners[game.id].winner === game.home.name ? game.home.alias : ""}`} onClick={(e) => toggleWinner(e, game.id)} id="home" >
//                                 {game.home.name}
//                             </span>
//                             <span className='text-2xl font-bold'>vs</span>
//                             <span className={` basis-1/3 p-2 border-2 border-slate-200 w-1/4 rounded-md font-bold hover:scale-105 text-sm  hover:cursor-pointer ${winners[game.id].winner === game.away.name ? game.away.alias : ""}`} id="away" onClick={(e) => toggleWinner(e, game.id)}>
//                                 {game.away.name}
//                             </span>
//                             <select name={game.id} id=""  onChange={(e) => handlePoints(e, game.id)}>
//                                 <option value="">Select Points</option>
//                                 {points.map(point => !usedPoints.includes(point) ? <option value={point}>{point}</option> : <option value={point} hidden>{point}</option>)}
//                             </select>
//                         </p>
//                     </>
//                 )}
//             </div>
//         </div>
//     )
// }
