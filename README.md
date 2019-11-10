## Available Scripts

In the project directory, you can run:

### `yarn start`


## Decisions behind the creation

I decided to use react as my prefered framework as I have previously had experiences with it.

The idea behind the project structure was to have `components` folder with each of the forecasts(`FiveDayForecast.js` day and `HourlyForecast.js`) along with the `Day.js`
component which is being rendered in the `FiveDayForecast.js`. 

For my styling I used Material-Ui(https://material-ui.com/) as I find it pretty intuitive and easy to use, it also allows for in built styling of each component which is passed as to a className as a prop.

I had some troubling regarding on how to iterate over the data for my `HourlyForecast.js` as I could not use an hourly weather endpoint from OpenWeather API because it was not free so I had to use the same response I have got from my 5 day forecast. The solution was to format date time to a day to be then be able to check if the formatted day is equal to the route params name and if it is, and each fraction of the day to the new array.
That's also the reason why some of the days might have more fractions of hourly weather than the others.

## What could be improved

Definately the design aspect, I was more focusing on building the right functionalty and how to manipulate the data to fit my needs.
Moreover, with having more components, I would focus on modularizing the code because reusable code is highly appreciated.
When it comes to functionalities, I would add a search bar where you could enter any name of the city and it would fetch the data for a given city
and display it. Also, fetching corresponding images from an API would also be nice as of right now I only added a few images to the project directory.
Having a graph which is tied to hourly weather being displayed in my `HourlyForecast.js` would be another thing I would add.
