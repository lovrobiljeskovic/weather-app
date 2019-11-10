// import moment from 'moment'

// export const fetchData = async () => {
//     const response = await fetch("http://api.openweathermap.org/data/2.5/forecast?q=Copenhagen,DK&units=metric&appid=e32189b1c0b6fa5ca3b2ffeab43b9af4");
//     const myJson = await response.json();
//     const days = {}
//     for(const partOfDay of myJson.list) {
//         const dayOfWeek = moment(partOfDay.dt_txt).format('dddd')
//         dayOfWeek in days || (days[dayOfWeek] = [])
//         days[dayOfWeek].push(partOfDay)
//     }
//     this.setState({
//         days
//     })

//     console.log("IM HERE",days)
//     return days;
// }