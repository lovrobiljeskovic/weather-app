import React from 'react';
import Day from './Day';
import {weekdays, temps, img} from '../constants'
import {Grid, Typography, Paper} from '@material-ui/core'
import axios from 'axios'

class FiveDayForecast extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            data: []
        }
    }
    
    fetchData = async () => {
        const response = await fetch("https://samples.openweathermap.org/data/2.5/forecast?q=M%C3%BCnchen,DE&appid=b6907d289e10d714a6e88b30761fae22");
        const myJson = await response.json();
        console.log(JSON.stringify(myJson));
    }

    componentDidMount() {
        this.fetchData()
    }


    render() {
        return (
        <Grid container justify="center" style={{height:"100vh"}} alignItems="center"direction="row" spacing={2}>
            {
                weekdays.map((day, idx) => {
                    return (
                        <Grid item key={idx}>
                            <Day
                                dayOfTheWeek={day}
                                temperature={temps[idx]}
                                img={img}
                            />
                        </Grid>
                    )
                })
            }
        </Grid>
        );
    }
}

export default FiveDayForecast

