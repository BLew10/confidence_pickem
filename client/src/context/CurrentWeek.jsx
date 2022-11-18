import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'


const WeekContext = React.createContext()

export function useWeek(){
    return useContext(WeekContext)
}

export function WeekProvider({ children }){
    const [currentWeek, setCurrentWeek] = useState(11)

    useEffect(() => {
        axios.get(`http://api.sportradar.us/nfl/official/trial/v7/en/games/2022/REG/schedule.json?api_key=p8q425as6ugsav33c86v5bvw`)
            .then(res => {
                let weeks = res.data.weeks
                let weeksArr =[]

                for(let weekNum in weeks){
                    console.log(weekNum)
                    if (weeks[weekNum].games[0].status !== "closed") {
                        weekNum = 1 + parseInt(weekNum)
                        setCurrentWeek(weekNum)
                        console.log(currentWeek)
                       break
                    }

                }

            })
            .catch(err => console.log(err))
    }, []);


    return(
        <WeekContext.Provider value={currentWeek}>
            {children}
        </WeekContext.Provider>
    )
}