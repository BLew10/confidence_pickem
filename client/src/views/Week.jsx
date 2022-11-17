import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WeekDisplay from '../components/WeekDisplay';


const Week = (props) => {
const {weekNumber} = useParams()

    return (
        <div>
            <WeekDisplay weekNumber={weekNumber} />
        </div>
    )
}


export default Week


