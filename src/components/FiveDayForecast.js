import React from 'react';
import Day from './Day';
import {imgs} from '../constants'
import { Grid } from '@material-ui/core'
import moment from 'moment'

class FiveDayForecast extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            days: {}
        }
    }

    fetchData = async () => {
        const response = await fetch("http://api.openweathermap.org/data/2.5/forecast?q=Copenhagen,DK&units=metric&appid=e32189b1c0b6fa5ca3b2ffeab43b9af4");
        const myJson = await response.json();
        const days = {}
        for (const partOfDay of myJson.list) {
            const dayOfWeek = moment(partOfDay.dt_txt).format('dddd')
            dayOfWeek in days || (days[dayOfWeek] = [])
            days[dayOfWeek].push(partOfDay)
        }
        this.setState({
            days
        })
    }

    componentDidMount() {
        this.fetchData()
    }


    render() {
        const { days } = this.state
        return (
            <Grid container justify="center" style={{ height: "100vh" }} alignItems="center" direction="row" spacing={2}>
                {
                    Object.entries(days).map((entry, idx) => {
                        const img = imgs[idx];
                        return (
                            <Grid item key={idx}>
                                <Day
                                    dayOfTheWeek={entry[0]}
                                    data={entry[1]}
                                    img={img}
                                    test={this.state}
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

