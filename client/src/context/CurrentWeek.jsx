import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'


const WeekContext = React.createContext()

export function useWeek(){
    return useContext(WeekContext)
}

export function WeekProvider({ children }){
    const [currentWeek, setCurrentWeek] = useState(11)
    // const gameDates = {
    //     11: ,
    //     12: ,
    //     13: ,
    //     14: ,
    //     15: ,
    //     16: ,
    //     17: ,
    //     18: 
    // }

    useEffect(() => {
        const date = new Date()
        let current = date.getTime()
        console.log(current)

    }, []);


    return(
        <WeekContext.Provider value={currentWeek}>
            {children}
        </WeekContext.Provider>
    )
}