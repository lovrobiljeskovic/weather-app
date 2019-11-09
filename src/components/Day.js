import React from 'react'
import {Grid, Typography, Paper, ButtonBase} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import compose from 'recompose/compose'
import {withRouter} from 'react-router-dom'

class Day extends React.Component {

    handleClickEvent = (name) => {
        this.props.history.push(name);
    }

    render() {
        const { dayOfTheWeek, temperature, img, classes} = this.props
        return (
            <ButtonBase>
            <Paper className={classes.paper} elevation={2} >
                <Grid container direction="column" alignItems="center" onClick={() => this.handleClickEvent(dayOfTheWeek)}>
                  <Grid item>
                   <Typography variant={"h4"}>
                        {dayOfTheWeek}
                    </Typography>
                </Grid>
                    <Grid item>
                        <img className="img" src={process.env.PUBLIC_URL + img} alt="nibba"/>
                    </Grid>
                    
                    <Grid item>
                        <Grid container direction="row" spacing={1}>
                            <Grid item>
                                <Typography variant={"h5"}>
                                    {temperature[0]}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant={"h5"}>
                                    {temperature[1]}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            </ButtonBase>
        )
    }
}

const styles = {
    paper: { 
        background: "rgba(255, 228, 196, 1)", 
        paddingTop:15, 
        paddingBottom:15, 
        transition: "background 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        "&:hover": {background:"rgba(128,128,128, 0.5)"}
    }
}

export default compose(withStyles(styles))(withRouter(Day))