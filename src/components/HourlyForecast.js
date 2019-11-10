import React from 'react'
import moment from 'moment'
import { Grid, Typography, Paper, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom'
import { imgs } from '../constants'
import { ArrowBack } from '@material-ui/icons';

class HourlyForecast extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hourlyData: []
        }
        console.log(props)
    }

    componentDidMount = () => {
        this.fetchData()
    }

    fetchData = async () => {
        const { nameOfTheDay } = this.props.match.params
        console.log(this.props.match.params)
        const response = await fetch("http://api.openweathermap.org/data/2.5/forecast?q=Copenhagen,DK&units=metric&appid=e32189b1c0b6fa5ca3b2ffeab43b9af4");
        const myJson = await response.json();
        const hourlyData = []
        for (const partOfDay of myJson.list) {
            const dayOfWeek = moment(partOfDay.dt_txt).format('dddd')
            if (dayOfWeek === nameOfTheDay) {
                hourlyData.push(partOfDay)
            }
        }
        this.setState({
            hourlyData
        })
    }


    render() {

        const { classes } = this.props
        const { hourlyData } = this.state
        return (
            <Grid container style={{ height: "100vh" }}>
                <Grid container alignItems="center" justify="center" direction="row" >
                    <Grid item>
                        <Paper className={classes.title}>
                            <Typography variant={"h3"}>
                                {"Hourly Weather for Copenhagen"}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
                {
                    makeWeatherPropsHolder(classes, hourlyData)
                }
                <IconButton onClick={() => this.props.history.push("/")} style={{position:"absolute", top:16, left:16}}>
                <ArrowBack/>
            </IconButton>
            </Grid>
        )
    }
}

const makeWeatherPropsHolder = (style, items) => {
    console.log(items)
    return (
        <Grid container className={style.makeWeatherPropsHolder} wrap="nowrap" justify="center" direction="row" spacing={1}>

            {
                items.map((entry, idx) => {
                    const img = imgs[idx];
                    return (
                        <Grid key={idx} item>
                            <Paper className={style.weatherProps}>
                                <Typography style={{paddingTop: 5}}align="center" variant={"h6"}>
                                    {moment(entry.dt_txt).format('LT')}
                                </Typography>

                                <img className={style.hourlyImg} alt="no pic lul"
                                    src={img}
                                />
                                <Grid container direction='row' justify="space-between" style={{ paddingLeft: 16, paddingRight: 16 }}>
                                    <Grid item>
                                        <Typography variant={"h6"}>
                                            {"Max temp:"}
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Typography variant={"h6"}>
                                            {entry.main.temp_max + "°"}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid container direction='row' justify="space-between" style={{ paddingLeft: 16, paddingRight: 16 }}>
                                    <Grid item>
                                        <Typography variant={"h6"}>
                                            {"Min temp:"}
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Typography variant={"h6"}>
                                            {entry.main.temp_min + "°"}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid container direction='row' justify="space-between" style={{ paddingLeft: 16, paddingRight: 16 }}>
                                    <Grid item>
                                        <Typography variant={"h6"}>
                                            {"Wind:"}
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Typography variant={"h6"}>
                                            {entry.wind.speed + "m/s"}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid container direction='row' justify="space-between" style={{ paddingLeft: 16, paddingRight: 16 }}>
                                    <Grid item>
                                        <Typography variant={"h6"}>
                                            {"Humidity:"}
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Typography variant={"h6"}>
                                            {entry.main.humidity + "%"}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    )
                })
            }
        </Grid>

    )
}

const styles = {

    weatherPropsHolder: {
        alignContent: 'flex-start',
    },

    weatherProps: {
        background: "rgba(255, 228, 196, 1)",
        marginRight: "10px",
        width: "200px",
        height: "320px"
    },

    hourlyImg: {
        width: "150px",
        height: "150px",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto"
    },

    title: {
        background: "rgba(255, 228, 196, 1)",
        padding: 8
    }

}

export default compose(withStyles(styles))(withRouter(HourlyForecast))