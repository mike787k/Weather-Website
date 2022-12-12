import React, {useState} from 'react'
import axios from 'axios'
//import { response } from 'express'
window.onload = function() {

}
function App(){
  const [tmmr, setTmmr] = useState({})
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     var latitude = position.coords.latitude;
  //     var longitude = position.coords.longitude;
  //     const API_KEY = 'dbb38b80ed68424ce8c6c21a721192c0&units=imperial'
  //     const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + API_KEY; //Grabs the users weather for it's current location
  //     const url_days_of_week = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + API_KEY; //Grabs the users weather for the next few days for it's current location
  //     axios.get(url, {
  //       params: {
  //         lat: latitude,
  //         lon: longitude,
  //       }
  //     }).then(function(response) {
  //       setData(response.data);
  //     }).catch(function(error) {
  //     });
  //     axios.get(url_days_of_week, {
  //       params: {
  //         lat: latitude,
  //         lon: longitude,
  //       }
  //     }).then(function(response) {
  //       setTmmr(response.data);
  //       // Store the weather data in your application
  //     }).catch(function(error) {
  //       // Handle any errors that occurred
  //     });
  //   });
  // }
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=6ccccb61744d6fcab3a44ba780830655&units=imperial`
  const url_days_of_week = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=6ccccb61744d6fcab3a44ba780830655&units=imperial`
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })

      axios.get(url_days_of_week).then((response) =>{
        setTmmr(response.data)
        console.log(response.data)
      })

      setLocation('')
    }
  }
  const createWeek = (event) => {
    const days = [];
    for(let i = 0; i < 7; i++)
    {
      const day = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&cnt=${i}&appid=0649db80359931b5e91fd867a95060ba&units=imperial`
      days.push(
        <div className='data-container'>
        <div className='top-screen'>
          <div classname='location'>
            <p>{data.name}</p>
          </div>
          <div className="temperature">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.main ?
              <p style={{color:"red"}}>High Temp: {data.main.temp_max.toFixed()}°F  </p>
              : null
            }
            {data.main ?
              <p style={{color:"blue"}}>Low Temp:  {data.main.temp_min.toFixed()}°F </p>
              : null
            }
            {data.weather ?  
              <p>Weather currently:   {data.weather[0].main}</p> 
              : null
            }
            {data.main ? 
              <p>Currently Feels Like: {data.main.feels_like.toFixed()}°F</p> 
              : null
            }
            {data.wind ?
              <p>Wind Speed: {data.wind.speed.toFixed()} MPH</p> 
              : null
            }
          </div>
        </div>
      </div>
      )
    }
  }

  
  return (
    <div className='app'>
      <div className='search-field'>
        <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder='Enter Location'
            type="text" />
      </div>

      <div className='data-container'>
        <div className='top-screen'>
          <div classname='location'>
            <p>{data.name}</p>
          </div>
          <div className="temperature">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.main ?
              <p style={{color:"red"}}>High Temp: {data.main.temp_max.toFixed()}°F  </p>
              : null
            }
            {data.main ?
              <p style={{color:"blue"}}>Low Temp:  {data.main.temp_min.toFixed()}°F </p>
              : null
            }
            {data.weather ?  
              <p>Weather currently:   {data.weather[0].main}</p> 
              : null
            }
            {data.main ? 
              <p>Currently Feels Like: {data.main.feels_like.toFixed()}°F</p> 
              : null
            }
            {data.wind ?
              <p>Wind Speed: {data.wind.speed.toFixed()} MPH</p> 
              : null
            }
          </div>
        </div>
      </div>
      <div className='week-container'>
        <div className="week">
          <div className="days">
            <div>
              {tmmr.list ?
                <p>{(tmmr.list[0].dt_txt).substr(0,10)}</p>
              : <p>No Data Provided</p>
              }
              {tmmr.list ?
                <p>Average Temp: {tmmr.list[0].main.temp}</p>
              : <p>No Data Provided</p>  
            }
              {tmmr.list ?
                <p>Feels Like: {tmmr.list[0].main.feels_like}</p>
              : <p>No Data Provided</p>
              }
            </div>
            <div>
            {tmmr.list ?
                <p>{(tmmr.list[9].dt_txt).substr(0,10)}</p>
              : <p>No Data Provided</p>
              }
              {tmmr.list ?
                <p>Average Temp: {tmmr.list[9].main.temp}</p>
              : <p>No Data Provided</p>  
            }
              {tmmr.list ?
                <p>Feels Like: {tmmr.list[9].main.feels_like}</p>
              : <p>No Data Provided</p>
              }
            </div>
            <div>{tmmr.list ?
                <p>{(tmmr.list[17].dt_txt).substr(0,10)}</p>
              : <p>No Data Provided</p>
              }
              {tmmr.list ?
                <p>Average Temp: {tmmr.list[17].main.temp}</p>
              : <p>No Data Provided</p>  
            }
              {tmmr.list ?
                <p>Feels Like: {tmmr.list[17].main.feels_like}</p>
              : <p>No Data Provided</p>
              }</div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default App;
