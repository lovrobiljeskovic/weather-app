import React from 'react'
import {Switch, Route, withRouter} from "react-router-dom"
import FiveDayForecast from './components/FiveDayForecast'
import HourlyForecast from './components/HourlyForecast'


class App extends React.Component {
    render() {
        return(
        <Switch>
            <Route exact path="/" component={FiveDayForecast}/>
            <Route path="/:nameOfTheDay" component={HourlyForecast}/>

        </Switch>
        );
    }
}

export default withRouter(App)