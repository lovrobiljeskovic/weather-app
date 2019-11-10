import React from 'react'
import moment from 'moment'
import { Grid, Typography, Paper, ButtonBase } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom'
import {imgs} from '../constants'

class HourlyForecast extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hourlyData:[]
        }
        console.log(props)
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = async () => {
        const {nameOfTheDay} = this.props.match.params
        console.log(this.props.match.params)
        const response = await fetch("http://api.openweathermap.org/data/2.5/forecast?q=Copenhagen,DK&units=metric&appid=e32189b1c0b6fa5ca3b2ffeab43b9af4");
        const myJson = await response.json();
        const hourlyData = []
        for (const partOfDay of myJson.list) {
            const dayOfWeek = moment(partOfDay.dt_txt).format('dddd')
            if(dayOfWeek === nameOfTheDay) {
                hourlyData.push(partOfDay)
            }
        }
        this.setState({
            hourlyData
        })
    }


    render() {

        const { classes} = this.props
        const {hourlyData} = this.state
        return (
            <Grid container style={{ height: "100vh" }}>
                <Grid container justify="center" direction="row" >
                    <Grid item>
                        <Typography variant={"h5"}>
                            {"Hourly Weather for Copenhagen"}
                        </Typography>
                    </Grid>
                </Grid>
                {
                    makeWeatherPropsHolder(classes, hourlyData)
                }
            </Grid>
        )
    }
}

const makeWeatherPropsHolder = (style, items) => {
    console.log(items)
    return (

        <Grid container className={style.weatherPropsHolder} direction="row" spacing={1}>

            {
                items.map((entry,idx) => {
                    const img = imgs[idx];
                    return (
                        <Grid key={idx} item className={style.weatherProps}>
                            <Typography variant={"h5"}>
                                {moment(entry.dt_txt).format('LT')}
                            </Typography>
                            <img className={style.hourlyImg} alt="no pic lul"
                            src={img}
                            />
                            <Typography variant={"h5"}>
                                {"Max temp: " + entry.main.temp_max + "°"}
                            </Typography>
                            <Typography variant={"h5"}>
                                {"Min temp: " + entry.main.temp_min + "°"}
                            </Typography>

                            <Typography variant={"h5"}>
                                {"Wind speed: " + entry.wind.speed + "m/s"}
                            </Typography>

                        </Grid>
                    )
                })
            }
        </Grid>

    )
}

const styles = {

    weatherPropsHolder: {
        alignContent: 'flex-start'
    },

    weatherProps: {
        background: "rgba(255, 228, 196, 1)",
        marginRight: "10px"
    },

    hourlyImg: {
        width: "150px",
        height: "150px"
    }

}

export default compose(withStyles(styles))(withRouter(HourlyForecast))